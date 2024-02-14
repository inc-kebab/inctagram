import { ElementRef, ElementType, Ref } from 'react'

export interface PolymorphRef<T extends ElementType> {
  ref?: Ref<ElementRef<T>>
}
