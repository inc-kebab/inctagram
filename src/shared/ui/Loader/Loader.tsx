import { Loader as LoaderIcon } from '@/shared/assets/icons/common'
import clsx from 'clsx'

import s from './Loader.module.scss'

type SizeProps =
  | {
      containerHeight?: boolean
      fullHeight?: false
    }
  | {
      containerHeight?: never
      fullHeight?: true
    }

interface BaseProps {
  size?: number
}

type Props = SizeProps & BaseProps

export const Loader = ({ containerHeight, fullHeight, size }: Props) => {
  return (
    <div
      className={clsx(s.loader, {
        [s.containerHeight]: containerHeight,
        [s.fullHeight]: fullHeight,
      })}
    >
      <LoaderIcon height={size ? size + 'px' : '100px'} width={size ? size + 'px' : '100px'} />
    </div>
  )
}
