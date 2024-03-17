import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { ArrowIos, Close } from '@/shared/assets/icons/common'
import * as RadixDialog from '@radix-ui/react-dialog'
import clsx from 'clsx'

import s from './Dialog.module.scss'

import { Button } from '../Button'
import { DialogClose } from './DialogClose'

export type Props = {
  className?: string
  handleBackBtn?: (url: string) => void
  title?: string
  trigger?: ReactNode
  variant?: 'post' | 'profile'
} & ComponentPropsWithoutRef<typeof RadixDialog.Root>

export const Dialog = forwardRef<ElementRef<typeof RadixDialog.Content>, Props>((props, ref) => {
  const { children, className, handleBackBtn, title, trigger, variant = '', ...rest } = props

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
                onClick={() => handleBackBtn?.('')}
                startIcon={<ArrowIos height={24} width={24} />}
                variant="text"
              />
              <h2 className={s.titleText}>{title}</h2>
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
