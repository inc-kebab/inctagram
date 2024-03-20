import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { CurrentWindow } from '@/feature/posts/ui/AddPostPhotoDialog/AddPostPhotoDialog'
import { ArrowIos, Close } from '@/shared/assets/icons/common'
import * as RadixDialog from '@radix-ui/react-dialog'
import clsx from 'clsx'

import s from './Dialog.module.scss'

import { Button } from '../Button'
import { DialogClose } from './DialogClose'

export type Props = {
  className?: string
  currentWindow?: CurrentWindow
  onBackClick?: () => void
  onNextClick?: () => void
  title?: string
  trigger?: ReactNode
  variant?: 'post' | 'profile'
} & ComponentPropsWithoutRef<typeof RadixDialog.Root>

export const Dialog = forwardRef<ElementRef<typeof RadixDialog.Content>, Props>((props, ref) => {
  const {
    children,
    className,
    currentWindow,
    onBackClick,
    onNextClick,
    title,
    trigger,
    variant = '',
    ...rest
  } = props

  return (
    <RadixDialog.Root {...rest}>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={s.overlay} />
        <RadixDialog.Content className={clsx(s.content, className)} ref={ref}>
          {variant === 'post' && (
            <div className={s.title}>
              <Button
                className={s.arrowBtn}
                onClick={onBackClick}
                startIcon={<ArrowIos height={24} width={24} />}
                variant="text"
              />
              <h2 className={s.titleText}>{title}</h2>
              <Button className={s.save} onClick={onNextClick} variant="text">
                {currentWindow === 'description' ? 'Publish' : 'Next'}
              </Button>
            </div>
          )}
          {variant === 'profile' && (
            <div className={s.title}>
              <h2 className={s.titleText}>{title}</h2>
              <DialogClose>
                <Close className={s.closeIcon} />
              </DialogClose>
            </div>
          )}
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
})
