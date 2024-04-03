import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'

import s from './CounterRegisteredUsers.module.scss'

interface Props {
  className?: string
  count: number
}

export const CounterRegisteredUsers = ({ className, count }: Props) => {
  if (count < 1) {
    return null
  }

  const arrayNumbers = Array.from('0' + count.toString(), Number)

  return (
    <div className={clsx(s.root, className)}>
      <Typography asComponent="h1" variant="h1">
        Registered users:
      </Typography>
      <div className={s.counter}>
        {arrayNumbers.map((el, i) => {
          return (
            <Typography className={s.number} key={i} variant="h2">
              {el}
            </Typography>
          )
        })}
      </div>
    </div>
  )
}
