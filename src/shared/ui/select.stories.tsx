import type { Meta, StoryObj } from '@storybook/react'

import En from '../../shared/assets/icons/lang/ru.svg'
import UK from '../../shared/assets/icons/lang/uk.svg'
import { Select } from './select'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    defaultValue: 'Select-box1',
    disabled: false,
    label: 'Select-box',
    onChangeValue: () => {},
    options: [
      { id: '1', value: 'Select-box1' },
      { id: '2', value: 'Select-box2' },
      { id: '3', value: 'Select-box3' },
    ],
  },
}

export const WithPagination: Story = {
  args: {
    defaultValue: '100',
    disabled: false,
    fullWidth: true,
    onChangeValue: () => {},
    options: [
      { id: '1', value: '100' },
      { id: '2', value: '70' },
      { id: '3', value: '50' },
    ],
    pagination: true,
  },
  decorators: [
    Select => (
      <div style={{ width: 60 }}>
        <Select />
      </div>
    ),
  ],
}

export const WithFlag: Story = {
  args: {
    defaultValue: 'Russian',
    disabled: false,
    fullWidth: true,
    onChangeValue: () => {},
    options: [
      {
        icon: <En />,
        id: '1',
        value: 'Russian',
      },
      {
        icon: <UK />,
        id: '2',
        value: 'English',
      },
    ],
  },
  decorators: [
    Select => (
      <div style={{ width: 163 }}>
        <Select />
      </div>
    ),
  ],
}
