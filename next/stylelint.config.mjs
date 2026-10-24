const config = {
    extends: ['stylelint-config-standard'],
    ignoreFiles: ['.next/**', '.canvas/**', 'node_modules/**', 'public/**'],
    plugins: ['stylelint-order'],
    rules: {
        'import-notation': 'string',
        'no-descending-specificity': null,
        'order/properties-alphabetical-order': true,
        'property-no-vendor-prefix': [true, { ignoreProperties: ['/text-size-adjust$/'] }],
        'selector-class-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$',
    },
};

export default config;
