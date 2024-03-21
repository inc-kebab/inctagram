module.exports = {
  extends: ['next/core-web-vitals', 'plugin:storybook/recommended', '@it-incubator/eslint-config'],
  overrides: [
    {
      files: ['**/*.stories.tsx'],
      rules: {
        'no-console': 'off',
        'react-hooks/rules-of-hooks': 'off',
      },
    },
  ],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        css: 'always',
        js: 'never',
        jsx: 'never',
        mjs: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'react/jsx-curly-brace-presence': [2, { children: 'never', props: 'never' }],
  },
}
