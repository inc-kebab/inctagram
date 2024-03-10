import { ForwardedRef, ReactNode, forwardRef } from 'react'
import * as React from 'react'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.scss'

import s from './DatePicker.module.scss'

import { CustomHeader } from './CustomHeader/CustomHeader'
import { CustomInput } from './CustomInput/CustomInput'

type NeedDatePickerProps =
  | 'dateFormat'
  | 'disabled'
  | 'endDate'
  | 'id'
  | 'maxDate'
  | 'onChange'
  | 'selected'
  | 'selectsRange'
  | 'startDate'

export type DatePickerProps<Range extends boolean | undefined = undefined> = {
  className?: string
  error?: ReactNode
  label?: string
  placeholder?: string
} & Pick<ReactDatePickerProps<Range>, NeedDatePickerProps>

export const DatePicker = forwardRef(
  <Range extends boolean | undefined = undefined>(
    { dateFormat = 'dd/MM/yyyy', error, label, placeholder, ...rest }: DatePickerProps<Range>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={s.root}>
        <ReactDatePicker
          calendarClassName={s.datePicker}
          calendarStartDay={1}
          customInput={<CustomInput error={error} label={label} ref={ref} />}
          dateFormat={dateFormat}
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
)
