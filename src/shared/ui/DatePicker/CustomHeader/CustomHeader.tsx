import { type ReactDatePickerCustomHeaderProps } from 'react-datepicker'

import { ChevronLeft, ChevronRight } from '@/shared/assets/icons/common'
import { Button } from '@/shared/ui/Button'
import { getMonth, getYear } from 'date-fns'

import s from './CustomHeader.module.scss'

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

type CustomHeaderProps = Pick<
  ReactDatePickerCustomHeaderProps,
  'date' | 'decreaseMonth' | 'increaseMonth'
>

export const CustomHeader = (props: CustomHeaderProps) => {
  const { date, decreaseMonth, increaseMonth } = props

  return (
    <div className={s.header}>
      <div className={s.date}>
        {months[getMonth(date)]} {getYear(date).toString()}
      </div>
      <div className={s.buttons}>
        <Button
          className={s.button}
          onClick={decreaseMonth}
          startIcon={<ChevronLeft />}
          variant="text"
        />
        <Button
          className={s.button}
          onClick={increaseMonth}
          startIcon={<ChevronRight />}
          variant="text"
        />
      </div>
    </div>
  )
}
