import hashlib
import json
import os
import shlex
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DRUPAL = ROOT / 'drupal' if (ROOT / 'drupal').exists() else ROOT
SEED = DRUPAL / 'seed'
API = '/canvas/api/v0'
DRUSH = shlex.split(os.environ.get('SEED_DRUSH', 'ddev drush'))
TOKEN_LIFETIME = 120


def read_env():
    values = {}
    env_file = DRUPAL / '.env'
    for line in env_file.read_text().splitlines() if env_file.exists() else []:
        key, separator, value = line.partition('=')
        if separator:
            values[key.strip()] = value.strip()
    return {**values, **{key: os.environ[key] for key in ('CANVAS_SITE_URL', 'CANVAS_CLIENT_ID', 'CANVAS_CLIENT_SECRET') if key in os.environ}}


ENV = read_env()
BASE = ENV['CANVAS_SITE_URL']
TOKEN = {'value': None, 'issued': 0.0}


def bearer():
    if time.time() - TOKEN['issued'] > TOKEN_LIFETIME:
        body = urllib.parse.urlencode({
            'grant_type': 'client_credentials', 'client_id': ENV['CANVAS_CLIENT_ID'],
            'client_secret': ENV['CANVAS_CLIENT_SECRET'],
        }).encode()
        with urllib.request.urlopen(urllib.request.Request(BASE + '/oauth/token', data=body)) as response:
            TOKEN['value'] = json.load(response)['access_token']
        TOKEN['issued'] = time.time()
    return TOKEN['value']


def call(method, path, payload=None, retry=True):
    request = urllib.request.Request(
        BASE + API + path, method=method,
        data=json.dumps(payload).encode() if payload is not None else None,
        headers={'Authorization': f'Bearer {bearer()}', 'Content-Type': 'application/json', 'Accept': 'application/json'},
    )
    try:
        with urllib.request.urlopen(request) as response:
            return response.status, json.load(response)
    except urllib.error.HTTPError as error:
        if error.code == 404:
            return 404, None
        if error.code == 401 and retry:
            TOKEN['issued'] = 0.0
            return call(method, path, payload, retry=False)
        raise SystemExit(f'{method} {path} -> {error.code}: {error.read().decode()[:600]}')


def drush(*arguments):
    result = subprocess.run([*DRUSH, *arguments], cwd=DRUPAL, capture_output=True, text=True)
    if result.returncode:
        raise SystemExit(f'drush {" ".join(arguments)} failed: {result.stderr.strip()}')
    return result.stdout.strip()


def seed_hash(seed):
    return hashlib.sha256(json.dumps(seed, sort_keys=True, separators=(',', ':')).encode()).hexdigest()


def stored_hash(key):
    return drush('state:get', key)


def with_versions(nodes, versions):
    return [{**node, 'component_version': versions[node['component_id']]} for node in nodes]


def upsert_template(seed, versions):
    body = {key: value for key, value in seed.items() if value is not None}
    body['component_tree'] = with_versions(seed['component_tree'], versions)
    status, _ = call('GET', f'/config/page_variant/{seed["id"]}')
    if status == 404:
        call('POST', '/config/page_variant', body)
        return 'create'
    call('PATCH', f'/config/page_variant/{seed["id"]}', body)
    return 'update'


def verify_template(seed, versions):
    status, _ = call('GET', f'/config/page_variant/{seed["id"]}')
    if status == 404:
        upsert_template(seed, versions)
        print(f'create page-template {seed["id"]}')
        return
    print(f'skip page-template {seed["id"]}')


def upsert_page(seed, versions):
    body = {key: seed[key] for key in ('title', 'description', 'status', 'path', 'pageVariant')}
    body['components'] = with_versions(seed['components'], versions)
    status, existing = call('GET', f'/content/canvas_page/by-uuid/{seed["uuid"]}')
    if status == 404:
        call('POST', '/content/canvas_page', {**body, 'uuid': seed['uuid']})
        return 'create'
    call('PATCH', f'/content/canvas_page/{existing["id"]}', body)
    return 'update'


def push_item(label, key, seed, upsert, versions, force):
    digest = seed_hash(seed)
    if not force and stored_hash(key) == digest:
        print(f'skip {label}')
        return
    action = upsert(seed, versions)
    drush('state:set', key, digest)
    print(f'{action} {label}')


def main():
    force = '--force' in sys.argv
    _, components = call('GET', '/config/component')
    versions = {identifier: component['version'] for identifier, component in components.items()}
    templates = [json.loads(path.read_text()) for path in sorted((SEED / 'page-templates').glob('*.json'))]
    pages = [json.loads(path.read_text()) for path in sorted((SEED / 'pages').glob('*.json'))]
    for seed in templates:
        verify_template(seed, versions)
    call('PATCH', '/settings/default-page-variant', {'default_page_variant': 'meridian'})
    for seed in pages:
        push_item(seed['path'], f'meridian.seed.{seed["uuid"]}', seed, upsert_page, versions, force)
    front = next(seed['path'] for seed in pages if seed.get('front'))
    drush('config:set', 'system.site', 'page.front', front, '-y')
    print(f'front {front}')


if __name__ == '__main__':
    main()
