import { ComponentPropsWithoutRef } from 'react'

import * as RadixModal from '@radix-ui/react-dialog'
type Props = ComponentPropsWithoutRef<typeof RadixModal.Close>

export const DialogClose = ({ asChild, children, ...rest }: Props) => {
  return (
    <RadixModal.Close asChild {...rest}>
      {children}
    </RadixModal.Close>
  )
}
