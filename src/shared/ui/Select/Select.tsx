import * as React from 'react'
import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './Select.module.scss'

import ArrowIcon from '../../assets/icons/common/arrow-ios.svg'

export type Options = {
  icon?: ReactNode
  value: string
}
type Ref = ElementRef<typeof SelectRadix.Trigger>
type SelectProps = {
  className?: string
  classNameViewport?: string
  label?: string
  options: Options[]
  pagination?: boolean
  placeholder?: string
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const Select = forwardRef<Ref, SelectProps>(
  (
    {
      className,
      classNameViewport,
      defaultValue,
      disabled,
      label,
      onOpenChange,
      onValueChange,
      options,
      pagination = false,
      placeholder,
      value,
      ...rest
    },
    ref
  ) => {
    const handleValueChange = (value: string) => {
      onValueChange?.(value)
    }
    const handleOpenChange = (open: boolean) => {
      onOpenChange?.(open)
    }

    const cNames = {
      item: clsx(s.item, pagination ? s.withPagination : s.withoutPagination),
      root: clsx(s.root, className),
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
          {...rest}
        >
          <SelectRadix.Trigger className={cNames.trigger} ref={ref}>
            <SelectRadix.Value placeholder={placeholder} />
            <SelectRadix.Icon className={s.iconWrapper}>
              <ArrowIcon className={s.icon} />
            </SelectRadix.Icon>
          </SelectRadix.Trigger>
          <SelectRadix.Portal>
            <SelectRadix.Content collisionPadding={0} position="popper">
              <SelectRadix.Viewport className={cNames.viewport}>
                <SelectRadix.Group>
                  {options.map(option => (
                    <SelectRadix.Item
                      className={cNames.item}
                      key={option.value}
                      value={option.value}
                    >
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
)
