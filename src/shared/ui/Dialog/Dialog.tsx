import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { CurrentWindow } from '@/feature/post/ui/AddPostPhotoDialog/AddPostPhotoDialog'
import { ArrowIos, Close } from '@/shared/assets/icons/common'
import { useTranslation } from '@/shared/hooks/useTranslation'
import * as RadixDialog from '@radix-ui/react-dialog'
import clsx from 'clsx'

import s from './Dialog.module.scss'

import { Button } from '../Button'
import { Typography } from '../Typography'
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

  const { t } = useTranslation()

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
              <Typography variant="h1">{title}</Typography>
              <Button onClick={onNextClick} variant="text">
                {currentWindow === 'description' ? t.pages.post.publish : t.pages.post.next}
              </Button>
            </div>
          )}
          {variant === 'profile' && (
            <div className={s.title}>
              <Typography variant="h1">{title}</Typography>
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
