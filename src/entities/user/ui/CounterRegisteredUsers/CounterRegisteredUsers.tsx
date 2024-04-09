import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'

import s from './CounterRegisteredUsers.module.scss'

type Props = {
  className?: string
  count: number | undefined
}

export const CounterRegisteredUsers = ({ className, count }: Props) => {
  if (!count || count < 1) {
    return null
  }

  const arrayNumbers = Array.from('0' + count.toString(), Number)

  return (
    <div className={clsx(s.root, className)}>
      <Typography asComponent="h2" variant="h1">
        Registered users:
      </Typography>
      <div className={s.counter}>
        {arrayNumbers.map((el, i) => {
          return (
            <Typography asComponent="span" className={s.number} key={i} variant="h2">
              {el}
            </Typography>
          )
        })}
      </div>
    </div>
  )
}
