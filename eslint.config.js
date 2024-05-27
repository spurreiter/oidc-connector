import globals from 'globals'
import pluginJs from '@eslint/js'
import standard from 'eslint-config-standard'
import pluginReact from 'eslint-plugin-react'

// remove plugin rules from standard config
const standardRules = Object.entries(standard.rules).reduce(
  (rules, [key, val]) => {
    if (
      key.startsWith('import/') ||
      key.startsWith('n/') ||
      key.startsWith('promise/')
    ) {
      return rules
    }
    rules[key] = val
    return rules
  },
  {}
)

const config = [
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.mocha }
    }
  },
  { ...pluginJs.configs.recommended },
  {
    rules: standardRules
  },
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
      'react/prop-types': ['off']
    }
  }
]
export default config

// console.log(config)
