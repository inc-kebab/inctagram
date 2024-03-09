import { ReactNode } from 'react'
import * as React from 'react'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'

import clsx from 'clsx'
import { addDays } from 'date-fns'

import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.scss'

import s from './DatePicker.module.scss'

import { CustomHeader } from './CustomHeader/CustomHeader'
import { CustomInput } from './CustomInput/CustomInput'

export type DatePickerProps<WithRange extends boolean | undefined = undefined> = {
  className?: string
  error?: ReactNode
  label?: string
  placeholder?: string
} & Pick<
  ReactDatePickerProps<WithRange>,
  'endDate' | 'maxDate' | 'onChange' | 'selected' | 'selectsRange' | 'startDate'
>

const dateFormat: string = 'dd/MM/yyyy'

export const DatePicker = <WithRange extends boolean | undefined = undefined>({
  error,
  label,
  maxDate,
  placeholder,
  ...rest
}: DatePickerProps<WithRange>) => {
  return (
    <div className={s.root}>
      <ReactDatePicker
        calendarClassName={clsx(s.datePicker, error && s.error)}
        calendarStartDay={1}
        customInput={<CustomInput error={error} label={label} />}
        dateFormat={dateFormat}
        maxDate={maxDate && addDays(maxDate, 0)}
        placeholderText={placeholder}
        popperPlacement="bottom-start"
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <CustomHeader date={date} decreaseMonth={decreaseMonth} increaseMonth={increaseMonth} />
        )}
        {...rest}
      />
    </div>
  )
}
