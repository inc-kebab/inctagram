import clsx from 'clsx'

import s from './Skeleton.module.scss'

interface Props {
  className?: string
}

export const Skeleton = ({ className }: Props) => {
  return <div className={clsx(s.Skeleton, className)}></div>
}
