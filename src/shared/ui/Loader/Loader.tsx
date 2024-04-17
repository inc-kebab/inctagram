import { LoaderLogo, LoaderLogoW } from '@/shared/assets/icons/other'
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
  isWhite?: boolean
  size?: number
}

type Props = SizeProps & BaseProps

export const Loader = ({ containerHeight, fullHeight, isWhite, size }: Props) => {
  return (
    <div
      className={clsx(s.loader, {
        [s.containerHeight]: containerHeight,
        [s.fullHeight]: fullHeight,
      })}
    >
      {isWhite ? (
        <LoaderLogoW height={size ? size + 'px' : '100px'} width={size ? size + 'px' : '100px'} />
      ) : (
        <LoaderLogo height={size ? size + 'px' : '100px'} width={size ? size + 'px' : '100px'} />
      )}
    </div>
  )
}
