import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import jestPlugin from 'eslint-plugin-jest'

export default [
  {
    // Ignorar carpetas
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**'
    ]
  },
  js.configs.recommended,
  // Configuración principal para React
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      // NECESARIO PARA JSX
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      // globals de Node y navegador
      globals: {
        require: 'readonly',
        module: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        fetch: 'readonly'
      }
    },
    plugins: {
      react: reactPlugin,
      jest: jestPlugin
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      // 'no-console': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      // NECESARIO PARA QUE Link, Routes, Route, etc. NO MARQUEN ERROR
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
    }
  },
  // reglas para archivos de test
  {
    files: ['**/*.test.{js,jsx}', '**/*.spec.{js,jsx}'],
    plugins: {
      jest: jestPlugin
    },
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly'
      }
    },
    rules: {
      ...jestPlugin.configs.recommended.rules
    }
  }
]