import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadixTabs from '@radix-ui/react-tabs'
import clsx from 'clsx'

import s from './Tabs.module.scss'

type RootProps = Omit<ComponentPropsWithoutRef<typeof RadixTabs.Root>, 'asChild'>

const Root = forwardRef<ElementRef<typeof RadixTabs.Root>, RootProps>(
  ({ className, ...rest }, ref) => {
    if (!rest.defaultValue) {
      console.warn("You forgot to specify the 'defaultValue' property for Tabs.Root")
    }

    return <RadixTabs.Root className={clsx(s.root, className)} ref={ref} {...rest} />
  }
)

type ListProps = Omit<ComponentPropsWithoutRef<typeof RadixTabs.List>, 'asChild'>

const List = forwardRef<ElementRef<typeof RadixTabs.List>, ListProps>(
  ({ className, ...rest }, ref) => {
    return <RadixTabs.List className={clsx(s.list, className)} ref={ref} {...rest} />
  }
)

type ItemProps = Omit<ComponentPropsWithoutRef<typeof RadixTabs.Trigger>, 'asChild'>

const Item = forwardRef<ElementRef<typeof RadixTabs.Trigger>, ItemProps>(
  ({ className, ...rest }, ref) => {
    return <RadixTabs.Trigger className={clsx(s.trigger, className)} ref={ref} {...rest} />
  }
)

type ContentProps = Omit<ComponentPropsWithoutRef<typeof RadixTabs.Content>, 'asChild'>

const Content = forwardRef<ElementRef<typeof RadixTabs.Content>, ContentProps>(
  ({ className, ...rest }, ref) => {
    return <RadixTabs.Content className={clsx(s.content, className)} ref={ref} {...rest} />
  }
)

export const Tabs = { Content, Item, List, Root }
