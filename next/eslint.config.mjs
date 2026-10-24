import { required as drupalCanvasRequired } from '@drupal-canvas/eslint-config';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        rules: {
            '@next/next/no-img-element': 'off',
            'react-hooks/set-state-in-effect': 'off',
        },
    },
    ...drupalCanvasRequired,
    {
        rules: {
            'drupal-canvas/component-prop-names': 'off',
            '@next/next/no-html-link-for-pages': 'off',
        },
    },
    prettier,
    globalIgnores(['.canvas/**', '.next/**', 'build/**', 'node_modules/**', 'out/**', 'next-env.d.ts']),
]);
