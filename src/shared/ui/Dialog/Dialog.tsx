import React, { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'
import s from './Dialog.module.scss'
import * as RadixDialog from '@radix-ui/react-dialog'
import Close from '../../assets/icons/common/close.svg'
import { Typography } from '../Typography'
import clsx from 'clsx'

type Props = {
  title?: string
  description?: string
  className?: string
  trigger: ReactNode
} & ComponentPropsWithoutRef<typeof RadixDialog.Root>

export const Dialog = forwardRef<ElementRef<typeof RadixDialog.Root>, Props>((props, ref) => {
  const { title, description, className, trigger, ...rest } = props

  return (
    <RadixDialog.Root {...rest}>
      <RadixDialog.Trigger asChild>
        {trigger || <button className={clsx(s.Button, s.violet)}>Modal</button>}
      </RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={s.DialogOverlay} />
        <RadixDialog.Content className={s.DialogContent} ref={ref}>
          <RadixDialog.Title className={s.DialogTitle}>
            <Typography variant="h1">{title}</Typography>
          </RadixDialog.Title>
          <RadixDialog.Description className={s.DialogDescription}>
            <Typography variant='regular14'>{description}</Typography>
          </RadixDialog.Description>
          <div className={s.button_wrapper}>
            <RadixDialog.Close asChild>
              <button className={s.accept}>
                <Typography as='span' variant='regular14'>OK</Typography>
              </button>
            </RadixDialog.Close>
          </div>
          <RadixDialog.Close asChild>
            <button className={s.IconButton} aria-label="Close">
              <Close />
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
})
