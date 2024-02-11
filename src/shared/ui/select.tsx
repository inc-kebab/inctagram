import { ComponentPropsWithoutRef, FC, useState } from 'react'

import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

import ArrowIcon from '../assets/icons/common/arrow-ios.svg'

export type Options = {
  icon?: any
  id: string
  value: string
}

type SelectDemoProps = {
  className?: string
  classNameViewport?: string
  defaultValue?: string
  disabled?: boolean
  fullWidth?: boolean
  label?: string
  onChangeValue: (value: string) => void
  options: Options[]
  pagination?: boolean
  placeholder?: string
  value?: string
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const Select: FC<SelectDemoProps> = ({
  className,
  classNameViewport,
  defaultValue,
  disabled = false,
  fullWidth,
  label,
  onChangeValue,
  options,
  pagination = false,
  placeholder,
  value,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleValueChange = (value: string) => {
    onChangeValue(value)
  }
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  const cNames = {
    icon: clsx(s.icon, isOpen ? s.iconDown : s.iconUp),
    item: clsx(s.item, pagination ? s.withPagination : s.withoutPagination),
    root: clsx(s.root, fullWidth && s.fullWidth, className),
    trigger: clsx(s.trigger, pagination ? s.withPagination : s.withoutPagination),
    viewport: clsx(s.viewport, classNameViewport),
  }

  return (
    <div className={cNames.root}>
      <label className={s.label}>{label}</label>
      <SelectRadix.Root
        defaultValue={defaultValue}
        disabled={disabled}
        onOpenChange={handleOpenChange}
        onValueChange={handleValueChange}
        value={value}
      >
        <SelectRadix.Trigger className={cNames.trigger}>
          <SelectRadix.Value placeholder={placeholder} />
          <SelectRadix.Icon className={s.iconWrapper}>
            <ArrowIcon className={cNames.icon} />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content collisionPadding={0} position="popper">
            <SelectRadix.Viewport className={cNames.viewport}>
              <SelectRadix.Group>
                {options.map(option => (
                  <SelectRadix.Item className={cNames.item} key={option.id} value={option.value}>
                    {option.icon && <SelectRadix.ItemText>{option.icon}</SelectRadix.ItemText>}
                    <SelectRadix.ItemText>{option.value}</SelectRadix.ItemText>
                  </SelectRadix.Item>
                ))}
              </SelectRadix.Group>
            </SelectRadix.Viewport>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}
