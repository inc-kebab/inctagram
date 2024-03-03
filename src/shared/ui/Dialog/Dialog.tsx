import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { Close } from '@/shared/assets/icons/common'
import * as RadixDialog from '@radix-ui/react-dialog'
import clsx from 'clsx'

import s from './Dialog.module.scss'

import { DialogClose } from './DialogClose'

export type Props = {
  className?: string
  title?: string
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof RadixDialog.Root>

export const Dialog = forwardRef<ElementRef<typeof RadixDialog.Content>, Props>((props, ref) => {
  const { children, className, title, trigger, ...rest } = props

  return (
    <RadixDialog.Root {...rest}>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={s.overlay} />
        <RadixDialog.Content className={clsx(s.content, className)} ref={ref}>
          {title && (
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
