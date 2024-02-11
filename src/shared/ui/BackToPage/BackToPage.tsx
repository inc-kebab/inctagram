import { ElementRef, forwardRef } from 'react'

import ArrowIcon from '@/shared/assets/icons/common/arrow.svg'
import clsx from 'clsx'

import s from './BackToPage.module.scss'

interface Props {
  className?: string
  onNavigate: () => void
  title?: string
}

export const BackToPage = forwardRef<ElementRef<'button'>, Props>(
  ({ className, onNavigate, title }, ref) => {
    return (
      <button
        className={clsx(s.root, { [s.withTitle]: !!title }, className)}
        onClick={onNavigate}
        ref={ref}
      >
        <ArrowIcon />
        <span className={s.title}>{title}</span>
      </button>
    )
  }
)
