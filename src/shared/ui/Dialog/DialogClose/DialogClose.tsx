import { ComponentPropsWithoutRef } from 'react'

import * as RadixModal from '@radix-ui/react-dialog'
import clsx from 'clsx'

import s from './DialogClose.module.scss'

type Props = ComponentPropsWithoutRef<typeof RadixModal.Close>

export const DialogClose = ({ asChild, children, className, ...rest }: Props) => {
  return (
    <RadixModal.Close asChild className={clsx(s.close, className)} {...rest}>
      {children}
    </RadixModal.Close>
  )
}
