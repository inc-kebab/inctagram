import { ComponentPropsWithoutRef } from 'react'

import * as RadixDropdown from '@radix-ui/react-dropdown-menu'
import cn from 'classnames'

import s from './Separator.module.scss'

type Props = ComponentPropsWithoutRef<typeof RadixDropdown.Separator>

export const Separator = ({ className, ...rest }: Props) => {
  return <RadixDropdown.Separator className={cn(s.separator, className)} {...rest} />
}
