import { Loader as LoaderIcon } from '@/shared/assets/icons/common'
import clsx from 'clsx'

import s from './Loader.module.scss'

interface Props {
  fullHeight?: boolean
  size?: number
}

export const Loader = ({ fullHeight, size }: Props) => {
  return (
    <div className={clsx(s.loader, { [s.fullHeight]: fullHeight })}>
      <LoaderIcon height={size ? size + 'px' : '100px'} width={size ? size + 'px' : '100px'} />
    </div>
  )
}
