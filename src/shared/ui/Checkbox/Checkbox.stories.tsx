import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Checkbox } from './Checkbox'

const CHECKBOX_LABEL: string = 'Check-box'

const meta = {
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Set checked state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the Checkbox use',
    },
    label: {
      control: 'text',
      description: 'Set label for Checkbox',
    },
    onCheckedChange: {
      action: 'Value changed',
      description: 'Callback for change current value',
    },
  },
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'shared/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof Checkbox>

export const Checked: Story = {
  args: { checked: true, disabled: false, label: CHECKBOX_LABEL },
}
export const NotChecked: Story = {
  args: { checked: false, disabled: false, label: CHECKBOX_LABEL },
}
export const DisabledAndChecked: Story = {
  args: { checked: true, disabled: true, label: CHECKBOX_LABEL },
}
export const DisabledAndNotChecked: Story = {
  args: { checked: false, disabled: true, label: CHECKBOX_LABEL },
}
export const NoLabel: Story = {
  args: { checked: false, disabled: false },
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)

    return (
      <Checkbox
        checked={checked}
        disabled={false}
        label={CHECKBOX_LABEL}
        onCheckedChange={() => setChecked(!checked)}
      />
    )
  },
}
