import clsx from 'clsx'
import { Navigation, Pagination } from 'swiper/modules'
import { SwiperModule } from 'swiper/types'

interface Params {
  classes?: (Record<string, boolean> | string)[]
  modules?: SwiperModule[]
  navigation?: boolean
  pagination?: boolean
  slidesPerView?: number
}

export const getDefaultSwiperConfig = ({
  classes = [],
  modules = [],
  navigation = true,
  pagination = true,
  slidesPerView = 1,
}: Params) => {
  const defaultModules: SwiperModule[] = []

  navigation && modules.push(Navigation)
  pagination && modules.push(Pagination)

  return {
    className: clsx('post-single-slider', ...classes),
    modules: [...defaultModules, ...modules],
    navigation,
    pagination: pagination ? false : { clickable: true },
    slidesPerView,
    spaceBetween: 0,
  }
}
