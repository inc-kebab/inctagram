import { ElementType, Ref, ElementRef } from 'react'

export interface PolymorphRef<T extends ElementType> {
  ref?: Ref<ElementRef<T>>
}
