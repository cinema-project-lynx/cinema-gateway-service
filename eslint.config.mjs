import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sonarjs from 'eslint-plugin-sonarjs';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      sonarjs,
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: './tsconfig.eslint.json',
        sourceType: 'module',
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
      },
    },
    rules: {
      'no-console': 'warn',
      'prettier/prettier': ['warn', { usePrettierrc: true }],
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  {
    ignores: ['.gitlab', '.vscode', 'dist', 'src/generated', 'tests/generated'],
  },
];