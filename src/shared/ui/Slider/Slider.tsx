import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'
import clsx from 'clsx'

import s from './Slider.module.scss'

type Props = Omit<ComponentPropsWithoutRef<typeof RadixSlider.Root>, 'asChild'>

export const Slider = forwardRef<ElementRef<typeof RadixSlider.Root>, Props>(
  (props: Props, ref) => {
    const { className, disabled, onValueChange, value, ...rest } = props

    return (
      <RadixSlider.Root
        className={clsx(s.sliderRoot, className)}
        disabled={disabled}
        onValueChange={onValueChange}
        ref={ref}
        value={value}
        {...rest}
      >
        <RadixSlider.Track className={s.sliderTrack}>
          <RadixSlider.Range className={s.sliderRange} />
        </RadixSlider.Track>
        <RadixSlider.Thumb className={s.sliderThumb} />
      </RadixSlider.Root>
    )
  }
)
