import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Nullable } from '@/shared/types'

import { DatePicker } from './DatePicker'

const meta = {
  argTypes: {},
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component: 'Simple Date picker. Based on `react-datepicker`',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'shared/DatePicker',
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof meta>

const placeholder = 'Select you date...'

export const Default: Story = {
  args: {
    placeholder,
  },
}

export const DefaultFullScreen: Story = {
  args: {
    placeholder,
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Date of Birth',
    placeholder,
  },
}

export const WithError: Story = {
  args: {
    error: (
      <span>
        Some error <b>occurred</b>
      </span>
    ),
    placeholder,
  },
}

export const Range: Story = {
  args: {
    endDate: new Date(2024, 2, 3),
    placeholder,
    startDate: new Date(),
  },
}

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = useState<Nullable<Date>>(new Date(2024, 2, 3))
    const onChange = (date: Nullable<Date>) => {
      setDate(date)
    }

    const day = date?.getDate()
    const month = (date?.getMonth() || 0) + 1
    const year = date?.getFullYear()

    const str = `${day}/${month}/${year}`

    return (
      <div>
        <span>Selected date: {str}</span>
        <DatePicker onChange={onChange} selected={date} />
      </div>
    )
  },
}

export const ControlledRange: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Nullable<Date>>(new Date(2024, 2, 3))
    const [endDate, setEndDate] = useState<Nullable<Date>>(new Date())
    const onChange = (dates: [Nullable<Date>, Nullable<Date>]) => {
      const [start, end] = dates

      setStartDate(start)
      setEndDate(end)
    }

    const startday = startDate?.getDate()
    const startmonth = (startDate?.getMonth() || 0) + 1
    const startyear = startDate?.getFullYear()

    const str1 = `${startday}/${startmonth}/${startyear}`

    const endday = endDate?.getDate()
    const endmonth = (endDate?.getMonth() || 0) + 1
    const endyear = endDate?.getFullYear()

    const str2 = endday ? `${endday}/${endmonth}/${endyear}` : undefined

    return (
      <div>
        <span>
          Selected range date: {str1} - {str2 || ''}
        </span>
        <DatePicker<true>
          endDate={endDate}
          onChange={onChange}
          selected={startDate}
          selectsRange
          startDate={startDate}
        />
      </div>
    )
  },
}
