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

const options = [{ value: '100' }, { value: '70' }, { value: '50' }]

export const Default: Story = {
  args: {
    defaultValue: 'Select-box1',
    label: 'Select-box',
    options: [{ value: 'Select-box1' }, { value: 'Select-box2' }, { value: 'Select-box3' }],
  },
}

export const Disabled: Story = {
  args: {
    defaultValue: 'Select-box1',
    disabled: true,
    label: 'Select-box',
    options: [{ value: 'Select-box1' }, { value: 'Select-box2' }, { value: 'Select-box3' }],
  },
}

export const PaginationVersion: Story = {
  args: {
    defaultValue: '100',
    disabled: false,
    options,
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
        value: 'Russian',
      },
      {
        icon: <UkIcon />,
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
  args: { options },
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
