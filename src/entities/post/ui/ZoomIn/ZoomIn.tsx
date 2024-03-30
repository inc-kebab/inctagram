import { useAppDispatch } from '@/app/store/store'
import { Maximize } from '@/shared/assets/icons/outline'
import { Button } from '@/shared/ui/Button'
import { Slider } from '@/shared/ui/Slider'
import clsx from 'clsx'

import s from './ZoomIn.module.scss'

import { postsActions } from '../../model/slice/post-slice'
import { ImageObj } from '../../model/types/post.types'

type Props = {
  activeIndex: number
  className?: string
  images: ImageObj[]
  isOpenZoom: boolean
  setIsOpenZoom: (isOpenZoom: boolean) => void
  setZoom: (zoom: number) => void
  zoom: number
}

export const ZoomIn = (props: Props) => {
  const { activeIndex, className, images, isOpenZoom, setIsOpenZoom, setZoom, zoom } = props
  const dispatch = useAppDispatch()
  const imageObj = images[activeIndex]

  const onAspectHandler = () => {
    setIsOpenZoom(!isOpenZoom)
    dispatch(
      postsActions.setImages(
        images.map(image => {
          if (image.imageURL === imageObj?.imageURL) {
            return imageObj.aspect ? image : { ...image, aspect: 1 }
          } else {
            return image
          }
        })
      )
    )
  }

  return (
    <div className={className}>
      <Button
        className={s.zoomInBtn}
        onClick={onAspectHandler}
        startIcon={<Maximize className={clsx(isOpenZoom && s.isOpenIcon)} height={24} width={24} />}
      />

      {isOpenZoom && (
        <div className={s.zoomInContainer}>
          <Slider
            className={s.slider}
            max={2.5}
            min={1}
            onValueChange={value => setZoom(value[0])}
            sliderThumbClass={s.sliderThumbClass}
            sliderTrackClass={s.sliderTrackClass}
            step={0.01}
            value={[zoom]}
          />
        </div>
      )}
    </div>
  )
}
