import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { RuIcon, UkIcon } from '@/shared/assets/icons/lang'

import { Select } from './Select'

const meta = {
  argTypes: {
    defaultValue: {
      control: false,
      description: 'Set a default value',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the Select use',
    },
    label: {
      control: false,
      description: 'Set a label',
    },
    onValueChange: {
      action: 'Value changed',
      description: 'Callback for change current value',
    },
    options: {
      control: false,
      description: 'Options',
    },
    pagination: {
      control: false,
      description: 'Props changing styles for pagination',
    },
  },
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          'The Select component in React provides a customizable dropdown selection interface with options, supporting features like pagination, placeholder text, and styling classes for easy customization. It utilizes Radix for enhanced styling and functionality, making it simple to create interactive select dropdowns for various use cases.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'shared/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const paginationOptions = [
  { name: '100', value: '100' },
  { name: '70', value: '70' },
  { name: '50', value: '50' },
]
const defaultOptions = [
  { name: 'Select-box1', value: 'Select-box1' },
  { name: 'Select-box2', value: 'Select-box2' },
  { name: 'Select-box3', value: 'Select-box3' },
]

export const Default: Story = {
  args: {
    defaultValue: 'Select-box1',
    label: 'Select-box',
    options: defaultOptions,
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: 'Select-box1',
    disabled: true,
    label: 'Select-box',
    options: defaultOptions,
  },
}

export const PaginationVersion: Story = {
  args: {
    defaultValue: '100',
    disabled: false,
    options: paginationOptions,
    pagination: true,
  },
  render: args => (
    <div style={{ width: 50 }}>
      <Select {...args} />
    </div>
  ),
}

export const LangVersion: Story = {
  args: {
    defaultValue: 'Russian',
    disabled: false,
    options: [
      {
        icon: <RuIcon />,
        name: 'Russian',
        value: 'Russian',
      },
      {
        icon: <UkIcon />,
        name: 'English',
        value: 'English',
      },
    ],
  },
  render: args => (
    <div style={{ width: 163 }}>
      <Select {...args} />
    </div>
  ),
}

export const Controlled: Story = {
  args: { options: defaultOptions },
  render: args => {
    const [current, setCurrent] = useState<null | string>(null)

    const handleChangeCurrentOption = (value: string) => {
      setCurrent(value)
    }

    return (
      <Select
        label={`Current option value: ${current || 'none'}`}
        onValueChange={handleChangeCurrentOption}
        options={args.options}
        placeholder="Select controlled value"
      />
    )
  },
}
