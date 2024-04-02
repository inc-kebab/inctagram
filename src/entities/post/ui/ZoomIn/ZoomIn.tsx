import { useState } from 'react'

import { useAppDispatch } from '@/app'
import { Maximize } from '@/shared/assets/icons/outline'
import { Button } from '@/shared/ui/Button'
import { Slider } from '@/shared/ui/Slider'
import clsx from 'clsx'

import s from './ZoomIn.module.scss'

import { postsActions } from '../../model/slice/post-slice'

type Props = {
  aspect: number
  className?: string
  imageURL: string
  zoom: number
}

export const ZoomIn = (props: Props) => {
  const { aspect, className, imageURL, zoom } = props
  const [isOpenZoom, setIsOpenZoom] = useState(false)
  const dispatch = useAppDispatch()

  const handleSetAspect = () => {
    if (aspect === 0) {
      dispatch(postsActions.updateImage({ aspect: 1, imageURL }))
    } else if (aspect > 0) {
      dispatch(postsActions.updateImage({ aspect, imageURL }))
    }

    if (isOpenZoom) {
      dispatch(postsActions.updateImage({ aspect: 0, imageURL }))
    }

    setIsOpenZoom(!isOpenZoom)
  }

  const handleZoom = (value: number) => {
    dispatch(postsActions.updateImage({ imageURL, zoom: value }))
  }

  return (
    <div className={className}>
      <Button
        className={s.zoomInBtn}
        onClick={handleSetAspect}
        startIcon={<Maximize className={clsx(isOpenZoom && s.isOpenIcon)} height={24} width={24} />}
      />

      {isOpenZoom && (
        <div className={s.zoomInContainer}>
          <Slider
            className={s.slider}
            max={2.5}
            min={1}
            onValueChange={value => handleZoom(value[0])}
            sliderThumbClass={s.sliderThumbClass}
            sliderTrackClass={s.sliderTrackClass}
            step={0.02}
            value={[zoom]}
          />
        </div>
      )}
    </div>
  )
}
