import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  argTypes: {
    onValueChange: {
      action: 'Value is changed',
      description: 'Callback for control current value',
    },
    options: {
      description: 'Array of options',
    },
    value: {
      control: { type: 'radio' },
      description: 'Current value group',
      options: ['rg1', 'rg2', 'rg3'],
    },
  },
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'shared/RadioGroup',
}

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { label: 'Radio 1', value: 'rg1' },
  { label: 'Radio 2', value: 'rg2' },
  { label: 'Radio 3', value: 'rg3' },
]
const optionsDisabled = [
  { disabled: true, label: 'Radio 5', value: 'rg1' },
  { label: 'Radio 1', value: 'rg2' },
  { label: 'Radio 2', value: 'rg3' },
]

export const Default: Story = {
  args: {
    options,
    value: options[0].value,
  },
}
export const Disabled: Story = {
  args: {
    options: optionsDisabled,
    value: optionsDisabled[0].value,
  },
}

export const Controlled: Story = {
  args: {
    options,
  },
  render: () => {
    const [current, setCurrent] = useState(options[0].value)

    const handleChangeCurrentRadio = (radioValue: string) => {
      setCurrent(radioValue)
    }

    return <RadioGroup onValueChange={handleChangeCurrentRadio} options={options} value={current} />
  },
}
