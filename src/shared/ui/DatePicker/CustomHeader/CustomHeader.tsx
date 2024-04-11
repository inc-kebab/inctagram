import { type ReactDatePickerCustomHeaderProps } from 'react-datepicker'

import { LocaleType } from '@/../locales'
import { ChevronLeft, ChevronRight } from '@/shared/assets/icons/common'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Options, Select } from '@/shared/ui/Select'
import clsx from 'clsx'
import { getMonth, getYear } from 'date-fns'

import s from './CustomHeader.module.scss'

const rangeYears = (start: number, end: number): Options[] => {
  return Array.from({ length: end - start }, (_, i) => {
    const value = (start + i).toString()

    return { name: value, value: value }
  })
}

const rangeMonth = (t: LocaleType): Options[] => {
  return [
    { name: t.dates.month.January, value: '0' },
    { name: t.dates.month.February, value: '1' },
    { name: t.dates.month.March, value: '2' },
    { name: t.dates.month.April, value: '3' },
    { name: t.dates.month.May, value: '4' },
    { name: t.dates.month.June, value: '5' },
    { name: t.dates.month.July, value: '6' },
    { name: t.dates.month.August, value: '7' },
    { name: t.dates.month.September, value: '8' },
    { name: t.dates.month.October, value: '9' },
    { name: t.dates.month.November, value: '10' },
    { name: t.dates.month.December, value: '11' },
  ]
}

type CustomHeaderProps = Pick<
  ReactDatePickerCustomHeaderProps,
  'changeMonth' | 'changeYear' | 'date' | 'decreaseMonth' | 'increaseMonth'
>

export const CustomHeader = (props: CustomHeaderProps) => {
  const { changeMonth, changeYear, date, decreaseMonth, increaseMonth } = props

  const { t } = useTranslation()

  const yearsOptions = rangeYears(getYear(new Date()) - 100, getYear(new Date()) + 1)

  const monthOptions = rangeMonth(t)

  return (
    <div className={s.header}>
      <Select
        classNames={{ trigger: clsx(s.select, s.month), viewport: s.viewport }}
        onValueChange={(month: string) => changeMonth(Number(month))}
        options={monthOptions}
        pagination
        portal={false}
        value={getMonth(date).toString()}
      />
      <Select
        classNames={{ trigger: clsx(s.select, s.year), viewport: s.viewport }}
        onValueChange={(year: string) => changeYear(Number(year))}
        options={yearsOptions}
        pagination
        portal={false}
        value={getYear(date).toString()}
      />
      <div className={s.buttons}>
        <Button
          className={s.button}
          onClick={decreaseMonth}
          startIcon={<ChevronLeft />}
          type="button"
          variant="text"
        />
        <Button
          className={s.button}
          onClick={increaseMonth}
          startIcon={<ChevronRight />}
          type="button"
          variant="text"
        />
      </div>
    </div>
  )
}
