import { ReactNode, useState } from 'react'

import { Dialog } from '@/shared/ui/Dialog'
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide'

import '@splidejs/splide/dist/css/splide.min.css'

import s from './AddPostPhotoDialog.module.scss'

import { CroppedArea } from '../../../profile/model/types/profile.types'
import { InputPhoto } from '../../../profile/ui/InputPhoto/InputPhoto'
import { CropperPost } from '../CropperPost/CropperPost'

export type CurrentWindow = 'description' | 'expand' | 'filter'

type Props = {
  arr?: string[]
  disabled?: boolean
  imageURLArray: string[]
  onImageURL: (imageURLArray: string[]) => void
  onOpenChange?: (open: boolean) => void
  onSetCroppedArea: (croppedArea?: CroppedArea) => void
  open?: boolean
  title?: string
  trigger: ReactNode
  variant?: 'post' | 'profile'
}

export const AddPostPhotoDialog = ({
  imageURLArray,
  onImageURL,
  onOpenChange,
  onSetCroppedArea,
  open,
  title,
  trigger,
  variant,
  ...rest
}: Props) => {
  const [currentWindow, setCurrentWindow] = useState<CurrentWindow>('expand')
  const handleSetPhoto = (file: File) => {
    onImageURL([...imageURLArray, URL.createObjectURL(file)])
  }

  const onNextClick = () => {
    if (currentWindow === 'expand') {
      setCurrentWindow('filter')
    } else if (currentWindow === 'filter') {
      setCurrentWindow('description')
    }
  }

  const onBackClick = () => {
    if (currentWindow === 'description') {
      setCurrentWindow('filter')
    } else if (currentWindow === 'filter') {
      setCurrentWindow('expand')
    } else {
      onImageURL([])
    }
  }

  return (
    <Dialog
      className={s.dialog}
      currentWindow={currentWindow}
      onBackClick={onBackClick}
      onNextClick={onNextClick}
      onOpenChange={onOpenChange}
      open={open}
      title={title}
      trigger={trigger}
      variant={variant}
    >
      {imageURLArray.length > 0 ? (
        <Splide aria-label="My Favorite Images">
          {imageURLArray.map((imageURL, i) => (
            <SplideSlide key={imageURL + i}>
              <CropperPost
                cropShape="rect"
                currentWindow={currentWindow}
                imageURL={imageURL}
                onSetCroppedArea={onSetCroppedArea}
                setPhoto={handleSetPhoto}
                {...rest}
              />
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        // <Swiper
        //   modules={[Navigation, Pagination, Scrollbar, A11y]}
        //   navigation
        //   onSlideChange={() => console.log('slide change')}
        //   onSwiper={swiper => console.log(swiper)}
        //   pagination={{ clickable: true }}
        //   scrollbar={{ draggable: true }}
        //   slidesPerView={1}
        //   spaceBetween={50}
        // >
        // {imageURLArray.map((imageURL, i) => (
        //   <SwiperSlide key={imageURL + i}>
        //     <CropperPost
        //       cropShape="rect"
        //       imageURL={imageURL}
        //       onSetCroppedArea={onSetCroppedArea}
        //       setPhoto={handleSetPhoto}
        //       {...rest}
        //     />
        //   </SwiperSlide>
        // ))}
        // </Swiper>
        <InputPhoto setPhoto={handleSetPhoto} />
      )}
    </Dialog>
  )
}
