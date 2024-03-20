import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Slider } from '@/shared/ui/Slider'

const meta = {
  argTypes: {
    defaultValue: {
      control: 'number',
      description: 'default value',
    },
    disabled: {
      control: 'boolean',
      description: 'disabled slider',
    },
    max: {
      control: 'number',
      description: 'max slider value',
    },
    min: {
      control: 'number',
      description: 'min slider value',
    },
    onValueChange: {
      action: 'Value changed',
      description: 'Callback for changed current value',
    },
    step: {
      control: 'number',
      description: 'step',
    },
  },
  component: Slider,
  tags: ['autodocs'],
  title: 'shared/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ControlledSlider: Story = {
  render: args => {
    const [values, setValues] = useState([0])

    return (
      <div style={{ textAlign: 'center' }}>
        <span style={{ display: 'inline-block', marginBottom: 20 }}>{values}</span>
        <Slider {...args} onValueChange={setValues} value={values} />
      </div>
    )
  },
}
