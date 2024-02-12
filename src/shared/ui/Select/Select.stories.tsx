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
  tags: ['autodocs'],
  title: 'shared/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const options = [{ value: '100' }, { value: '70' }, { value: '50' }]

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
    options,
    pagination: true,
  },
  render: args => (
    <div style={{ width: 50 }}>
      <Select {...args} />
    </div>
  ),
}

export const WithFlag: Story = {
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
      />
    )
  },
}
