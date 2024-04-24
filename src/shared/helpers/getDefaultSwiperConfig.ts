import clsx from 'clsx'
import { Navigation, Pagination } from 'swiper/modules'
import { SwiperModule } from 'swiper/types'

interface Params {
  classes?: (Record<string, boolean> | string)[]
  modules?: SwiperModule[]
  slidesPerView?: number
}

export const getDefaultSwiperConfig = ({
  classes = [],
  modules = [],
  slidesPerView = 1,
}: Params) => {
  return {
    className: clsx('post-single-slider', ...classes),
    modules: [Navigation, Pagination, ...modules],
    navigation: true,
    pagination: { clickable: true },
    slidesPerView,
    spaceBetween: 0,
  }
}
