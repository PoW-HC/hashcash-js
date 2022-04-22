// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['eslint:recommended', 'prettier', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [
    {
      files: ['**/*.ts'],
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: true,
        // new-line. needed for 'parserOptions.project depended' rules
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            args: 'all',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            caughtErrors: 'all',
          },
        ],
        '@typescript-eslint/no-use-before-define': [
          'warn',
          {
            functions: true,
            classes: true,
            variables: true,
            typedefs: true,
          },
        ],
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: false,
            allowTernary: false,
            allowTaggedTemplates: false,
          },
        ],
        'no-unused-expressions': 'off',
        '@typescript-eslint/adjacent-overload-signatures': 'warn',
        '@typescript-eslint/array-type': ['warn', { default: 'array-simple', readonly: 'array-simple' }],
        '@typescript-eslint/await-thenable': 'warn', // parserOptions.project depended
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/ban-types': [
          'warn',
          {
            types: {
              Object: 'Use {} instead',
              String: {
                message: 'Use string instead',
                fixWith: 'string',
              },
            },
          },
        ],
        camelcase: 'off',
        '@typescript-eslint/naming-convention': [
          'warn',
          {
            selector: 'function',
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'variable',
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'variable',
            modifiers: ['const'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          },
          {
            selector: 'typeParameter',
            format: ['PascalCase'],
            prefix: ['T'],
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
            prefix: ['I'],
            filter: {
              regex: '^(Window)$',
              match: false,
            },
          },
          {
            selector: 'memberLike',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'require',
          },
        ],
        '@typescript-eslint/consistent-type-assertions': ['warn', { assertionStyle: 'never' }],
        '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
        '@typescript-eslint/member-ordering': 'warn',
        '@typescript-eslint/no-dynamic-delete': 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-empty-interface': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-extraneous-class': 'warn',
        '@typescript-eslint/no-floating-promises': 'warn', // parserOptions.project depended
        '@typescript-eslint/no-for-in-array': 'warn',
        '@typescript-eslint/no-inferrable-types': 'warn',
        'no-magic-numbers': 'off',
        '@typescript-eslint/no-misused-new': 'warn',
        '@typescript-eslint/no-misused-promises': 'warn', // parserOptions.project depended
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-require-imports': 'warn',
        '@typescript-eslint/no-this-alias': 'warn',
        '@typescript-eslint/no-unnecessary-qualifier': 'warn', // parserOptions.project depended
        '@typescript-eslint/no-unnecessary-type-arguments': 'warn', // parserOptions.project depended
        '@typescript-eslint/explicit-module-boundary-types': ['warn', { allowHigherOrderFunctions: true }],
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/prefer-function-type': 'warn',
        '@typescript-eslint/prefer-includes': 'warn',
        '@typescript-eslint/prefer-readonly': 'warn', // parserOptions.project depended
        '@typescript-eslint/prefer-regexp-exec': 'warn', // parserOptions.project depended
        '@typescript-eslint/prefer-string-starts-ends-with': 'warn', // parserOptions.project depended
        '@typescript-eslint/require-array-sort-compare': 'warn', // parserOptions.project depended
        'require-await': 'off',
        '@typescript-eslint/restrict-plus-operands': 'warn', // parserOptions.project depended
        '@typescript-eslint/restrict-template-expressions': ['warn', { allowNumber: true }], // parserOptions.project depended
        '@typescript-eslint/unified-signatures': 'warn',
        '@typescript-eslint/unbound-method': 'warn', // parserOptions.project depended
      },
    },
    {
      files: ['**/*.test.ts'],
      rules: {
        '@typescript-eslint/consistent-type-assertions': 'off',
      },
    },
  ],
};
