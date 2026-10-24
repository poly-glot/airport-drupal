import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const DRUPAL = path.join(__dirname, '..', '..', 'drupal');
const CONTENT = path.join(DRUPAL, 'recipes', 'meridian_content', 'content', 'canvas_page');

interface ExportedPage {
    default: {
        title: [{ value: string }];
        description: [{ value: string }];
        path: [{ alias: string }];
    };
}

export interface ShippedPage {
    path: string;
    title: string;
    description: string;
}

const siteName: string = parse(readFileSync(path.join(DRUPAL, 'config', 'sync', 'system.site.yml'), 'utf8')).name;

export const shippedPages: ShippedPage[] = readdirSync(CONTENT)
    .filter((file) => file.endsWith('.yml'))
    .map((file) => (parse(readFileSync(path.join(CONTENT, file), 'utf8')) as ExportedPage).default)
    .map((page) => ({
        path: page.path[0].alias,
        title: `${page.title[0].value} | ${siteName}`,
        description: page.description[0].value,
    }))
    .sort((a, b) => a.path.localeCompare(b.path));
