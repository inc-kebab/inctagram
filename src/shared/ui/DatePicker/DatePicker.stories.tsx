import type { Meta, StoryObj } from '@storybook/react'

import { DatePicker, DatePickerProps } from './DatePicker'

const meta = {
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component:
          'DatePicker component is a customizable date picker control, utilizing Radix for styling. It supports properties like `value`, `onChange`, and `on`, offering flexibility in date picker appearance based on these props.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'shared/DatePicker',
} satisfies Meta<typeof DatePicker>

export default meta

const Template: StoryObj<typeof DatePicker> = (args: DatePickerProps) => <DatePicker {...args} />

export const DefaultDatePicker = Template.bind({})

DefaultDatePicker.args = {
  value: '2024-03-08T16:20:10.847Z',
}
