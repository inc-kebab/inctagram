import type { Meta, StoryObj } from '@storybook/react'

import En from '@/shared/assets/icons/lang/ru.svg'
import UK from '@/shared/assets/icons/lang/uk.svg'

import { Select } from './Select'

const meta = {
  argTypes: {
    defaultValue: {
      control: true,
      description: 'Default value',
    },
    disabled: {
      control: true,
      description: 'Disabled value',
    },
    label: {
      control: true,
      description: 'Label',
    },
    onValueChange: {
      action: 'Value changed',
      control: true,
      description: 'Callback for change current value',
    },
    options: {
      control: true,
      description: 'Options',
    },
    pagination: {
      control: true,
      description: 'Props changing styles for pagination',
    },
  },
  component: Select,
  tags: ['autodocs'],
  title: 'shared/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    defaultValue: 'Select-box1',
    disabled: false,
    label: 'Select-box',
    options: [{ value: 'Select-box1' }, { value: 'Select-box2' }, { value: 'Select-box3' }],
  },
}

export const WithPagination: Story = {
  args: {
    defaultValue: '100',
    disabled: false,
    options: [{ value: '100' }, { value: '70' }, { value: '50' }],
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
    options: [
      {
        icon: <En />,
        value: 'Russian',
      },
      {
        icon: <UK />,
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
