import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'
import clsx from 'clsx'

import s from './Slider.module.scss'

type Props = Omit<ComponentPropsWithoutRef<typeof RadixSlider.Root>, 'asChild'> & {
  sliderThumbClass?: string
  sliderTrackClass?: string
}

export const Slider = forwardRef<ElementRef<typeof RadixSlider.Root>, Props>(
  (props: Props, ref) => {
    const { className, sliderThumbClass, sliderTrackClass, ...rest } = props

    return (
      <RadixSlider.Root className={clsx(s.sliderRoot, className)} {...rest}>
        <RadixSlider.Track className={clsx(s.sliderTrack, sliderTrackClass)}>
          <RadixSlider.Range className={s.sliderRange} />
        </RadixSlider.Track>
        <RadixSlider.Thumb className={clsx(sliderThumbClass, s.sliderThumb)} />
      </RadixSlider.Root>
    )
  }
)
