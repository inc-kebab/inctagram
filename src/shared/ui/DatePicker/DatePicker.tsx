import ReactDatePicker from 'react-datepicker'
import { type UseFormSetValue } from 'react-hook-form'

import { Calendar as CalendarIcon } from '@/shared/assets/icons/fill'
import { AuthRoutes } from '@/shared/const/routes'
import clsx from 'clsx'
import { addDays, format } from 'date-fns'
import Link from 'next/link'

import 'react-datepicker/dist/react-datepicker.css'

import s from './DatePicker.module.scss'

import { CustomHeader } from './CustomHeader/CustomHeader'

export type DatePickerProps = {
  errorText?: string
  onChange?: (value: string) => void
  setValue: UseFormSetValue<any>
  value?: Date | string
}

const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const dateFormat: string = 'dd/MM/yyyy'
const dateTimeFormat: string = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"

export const DatePicker = ({ errorText, onChange, setValue, value }: DatePickerProps) => {
  let startDate = new Date()

  if (typeof value === 'string') {
    startDate = (value && new Date(Date.parse(value))) || new Date()
  }
  const onDateChange = (date: Date) => {
    setValue('dateOfBirth', format(date, dateTimeFormat), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
    onChange?.(format(date, dateTimeFormat))
  }

  return (
    <div>
      <div className={s.datePickerContainer}>
        <ReactDatePicker
          calendarClassName={clsx(s.datePicker, errorText && s.datePickerContainerError)}
          calendarStartDay={1}
          className={clsx(s.datePickerInput, errorText && s.datePickerError)}
          dateFormat={dateFormat}
          dayClassName={() => s.day}
          maxDate={addDays(new Date(), 0)}
          onChange={onDateChange}
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <CustomHeader
              date={date}
              decreaseMonth={decreaseMonth}
              increaseMonth={increaseMonth}
              months={months}
            />
          )}
          selected={startDate}
        />
        <CalendarIcon />
      </div>
      {errorText && (
        <div className={s.errorBlockInfo}>
          <p>{errorText}.</p>
          <Link className={s.link} href={AuthRoutes.PRIVACY}>
            Privacy policy
          </Link>
        </div>
      )}
    </div>
  )
}
