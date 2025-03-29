import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
        ignores: [
            'dist/**/*.ts',
            'dist/**',
            "**/*.mjs",
            "eslint.config.mjs",
            "**/*.js"
        ],
    },
    {
        rules: {
            '@typescript-eslint/restrict-template-expressions': 'off',
        },
    },
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
);
