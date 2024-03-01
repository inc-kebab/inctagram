import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { ArrowIos } from '@/shared/assets/icons/common'
import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './Select.module.scss'

export interface Options {
  icon?: ReactNode
  name?: ReactNode
  value: string
}

type Ref = ElementRef<typeof SelectRadix.Trigger>

type SelectProps = {
  className?: string
  classNames?: { icon?: string; item?: string; trigger?: string; viewport?: string }
  label?: string
  options: Options[]
  pagination?: boolean
  placeholder?: string
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>

export const Select = forwardRef<Ref, SelectProps>(
  ({ className, classNames, label, options, pagination = false, placeholder, ...rest }, ref) => {
    const cNames = {
      icon: clsx(s.icon, classNames?.icon),
      item: clsx(s.item, pagination ? s.withPagination : s.withoutPagination),
      root: clsx(s.root, className),
      trigger: clsx(
        s.trigger,
        pagination ? s.withPagination : s.withoutPagination,
        classNames?.trigger
      ),
      viewport: clsx(s.viewport, classNames?.viewport),
    }

    return (
      <div className={cNames.root}>
        {label && <label className={s.label}>{label}</label>}
        <SelectRadix.Root {...rest}>
          <SelectRadix.Trigger className={cNames.trigger} ref={ref}>
            <SelectRadix.Value placeholder={placeholder} />
            <SelectRadix.Icon asChild>
              <ArrowIos className={cNames.icon} />
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
                      <SelectRadix.ItemText>
                        <span className={s.text}>
                          {option.icon}
                          {option.name}
                        </span>
                      </SelectRadix.ItemText>
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
