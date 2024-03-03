import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  webpackFinal: async config => {
    // Adding supports aliases from Nextjs in Storybook
    config.resolve ??= {}
    config.resolve.alias ??= {}

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    }

    // Adding svgr loader in Storybook
    config.module ??= {}
    config.module.rules ??= []

    /*
     Looking for an existing svg images rule
     */
    const imageRule = config.module.rules.find(rule => {
      if (rule && typeof rule !== 'string' && rule.test instanceof RegExp) {
        return rule.test.test('.svg')
      }
    })

    /*
     Exclude the existing rule for svg images
     */
    if (imageRule && typeof imageRule !== 'string') {
      imageRule.exclude = /\.svg$/
    }

    /*
     Adding svgr loader for processing svg images
     */
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
export default config
