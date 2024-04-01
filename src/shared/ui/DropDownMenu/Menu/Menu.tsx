import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import * as RadixDropdown from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './Menu.module.scss'

type MenuProps = {
  onOpenChange?: (open: boolean) => void
  open?: boolean
  portal?: boolean
  trigger: ReactNode
} & Omit<ComponentPropsWithoutRef<typeof RadixDropdown.Content>, 'asChild'>

export const Menu = forwardRef<ElementRef<typeof RadixDropdown.Content>, MenuProps>(
  ({ children, className, onOpenChange, open, portal = true, trigger, ...rest }, ref) => {
    const menuContent = (
      <RadixDropdown.Content
        className={clsx(s.content, className)}
        ref={ref}
        {...rest}
        onPointerDownOutside={e => {
          if (!portal) {
            e.detail.originalEvent.preventDefault()
          }
        }}
      >
        {children}
      </RadixDropdown.Content>
    )

    return (
      <RadixDropdown.Root onOpenChange={onOpenChange} open={open}>
        <RadixDropdown.Trigger asChild>{trigger}</RadixDropdown.Trigger>
        {portal ? <RadixDropdown.Portal>{menuContent}</RadixDropdown.Portal> : menuContent}
      </RadixDropdown.Root>
    )
  }
)
