const BEM = '^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$';
const CAMEL = '^[a-z][a-zA-Z0-9]*$';

const config = {
    extends: ['stylelint-config-standard'],
    ignoreFiles: ['.next/**', '.canvas/**', 'node_modules/**', 'public/**'],
    plugins: ['stylelint-order'],
    rules: {
        'import-notation': 'string',
        'no-descending-specificity': null,
        'order/properties-alphabetical-order': true,
        'property-no-vendor-prefix': [true, { ignoreProperties: ['/text-size-adjust$/'] }],
        'selector-class-pattern': BEM,
    },
    overrides: [
        {
            files: ['**/*.module.css'],
            extends: ['stylelint-config-css-modules'],
            rules: {
                'selector-class-pattern': `${CAMEL}|${BEM}`,
            },
        },
    ],
};

export default config;
