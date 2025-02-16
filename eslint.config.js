import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'

const config = [
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.mocha }
    }
  },
  pluginJs.configs.recommended,
  {
    ignores: ['**/dist/', 'esm/', 'coverage/']
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    plugins: { react: pluginReact },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    },
    settings: {
      react: {
        pragma: 'h',
        version: '18'
      }
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      'react/prop-types': ['off'],
      'no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_err' }
      ]
    }
  }
]
export default config

// console.log(config)
