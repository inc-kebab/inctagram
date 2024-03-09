import { type ReactDatePickerCustomHeaderProps } from 'react-datepicker'

import { ChevronLeft, ChevronRight } from '@/shared/assets/icons/common'
import { Button } from '@/shared/ui/Button'
import { getMonth, getYear } from 'date-fns'

import s from './CustomHeader.module.scss'

type CustomHeaderType = {
  months: string[]
}

export const CustomHeader = (
  props: Pick<ReactDatePickerCustomHeaderProps, 'date' | 'decreaseMonth' | 'increaseMonth'> &
    CustomHeaderType
) => {
  const { date, decreaseMonth, increaseMonth, months } = props

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
          variant="transparent"
        />
        <Button
          className={s.button}
          onClick={increaseMonth}
          startIcon={<ChevronRight />}
          variant="transparent"
        />
      </div>
    </div>
  )
}
