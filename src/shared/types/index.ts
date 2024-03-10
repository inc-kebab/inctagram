import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  PropsWithChildren,
} from 'react'

interface ForwardedRefProp<T extends ElementType> {
  ref?: ForwardedRef<ElementRef<T>>
}

interface AsComponentProp<T extends ElementType> {
  asComponent?: T
}

export type PolymorphComponentProps<T extends ElementType, P = {}> = PropsWithChildren<
  P & AsComponentProp<T>
> &
  Omit<ComponentPropsWithoutRef<T>, keyof (AsComponentProp<T> & P)>

export type PolymorphComponentPropsWithRef<T extends ElementType, P = {}> = PolymorphComponentProps<
  T,
  P
> &
  ForwardedRefProp<T>

export type Nullable<T> = T | null
