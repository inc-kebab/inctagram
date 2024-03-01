import * as React from 'react'
import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { ArrowIos } from '@/shared/assets/icons/common'
import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './Select.module.scss'

export interface Options {
  icon?: ReactNode
  name?: string
  value: string
}

type Ref = ElementRef<typeof SelectRadix.Trigger>

type SelectProps = {
  className?: string
  classNameTrigger?: string
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
      classNameTrigger,
      classNameViewport,
      label,
      options,
      pagination = false,
      placeholder,
      ...rest
    },
    ref
  ) => {
    const cNames = {
      item: clsx(s.item, pagination ? s.withPagination : s.withoutPagination),
      root: clsx(s.root, className),
      trigger: clsx(
        s.trigger,
        pagination ? s.withPagination : s.withoutPagination,
        classNameTrigger
      ),
      viewport: clsx(s.viewport, classNameViewport),
    }

    return (
      <div className={cNames.root}>
        {label && <label className={s.label}>{label}</label>}
        <SelectRadix.Root {...rest}>
          <SelectRadix.Trigger className={cNames.trigger} ref={ref}>
            <SelectRadix.Value placeholder={placeholder} />
            <SelectRadix.Icon>
              <ArrowIos className={s.icon} />
            </SelectRadix.Icon>
          </SelectRadix.Trigger>
          <SelectRadix.Portal>
            <SelectRadix.Content className={s.content} collisionPadding={0} position="popper">
              <SelectRadix.Viewport className={cNames.viewport}>
                <SelectRadix.Group>
                  {options.map(option => (
                    <SelectRadix.Item
                      className={cNames.item}
                      key={option.value}
                      value={option.value}
                    >
                      {option.icon && <SelectRadix.ItemText>{option.icon}</SelectRadix.ItemText>}
                      {option.name && <SelectRadix.ItemText>{option.name}</SelectRadix.ItemText>}
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
