import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'
import s from './Dialog.module.scss'
import * as RadixDialog from '@radix-ui/react-dialog'
import clsx from 'clsx'

export type Props = {
  title?: string
  children?: ReactNode
  closeButton?: ReactNode
  trigger: ReactNode
  className?: string
} & ComponentPropsWithoutRef<typeof RadixDialog.Root>

export const Dialog = forwardRef<ElementRef<typeof RadixDialog.Root>, Props>((props, ref) => {
  const { title, children, closeButton, className, trigger, ...rest } = props

  const visibleTitle = title && (
    <div className={s.title}>
      <h2 className={s.title_text}>{title}</h2>
    </div>
  )

  const closeBtn = closeButton && (
    <RadixDialog.Close asChild className={s.CloseButton}>
      {closeButton}
    </RadixDialog.Close>
  )

  return (
    <RadixDialog.Root {...rest}>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={s.DialogOverlay} />
        <RadixDialog.Content className={clsx(s.DialogContent, className)} ref={ref}>
          {visibleTitle}
          <div className={s.dialog_description}>{children}</div>
          {closeBtn}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
})
