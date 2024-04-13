import clsx from 'clsx'
import { Navigation, Pagination } from 'swiper/modules'
import { SwiperModule } from 'swiper/types'

interface Params {
  classes?: (Record<string, boolean> | string)[]
  modules?: SwiperModule[]
}

export const getPostSliderConfig = ({ classes = [], modules = [] }: Params) => {
  return {
    className: clsx('post-single-slider', ...classes),
    modules: [Navigation, Pagination, ...modules],
    navigation: true,
    pagination: { clickable: true },
    slidesPerView: 1,
    spaceBetween: 0,
  }
}
