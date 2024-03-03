import type { Preview } from '@storybook/react'
import { Provider } from 'react-redux'

import '@/app/styles/index.scss'
import { store } from '../src/app'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'Dark',
      values: [
        {
          name: 'Dark',
          value: '#000',
        },
        {
          name: 'Light',
          value: '#f4f4f4',
        },
      ],
    },
  },
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
}

export default preview
