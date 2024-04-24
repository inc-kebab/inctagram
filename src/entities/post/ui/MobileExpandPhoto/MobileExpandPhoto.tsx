import { postsActions } from '@/entities/post'
import {
  HorizontalRectangle,
  Image as ImageIcon,
  Square,
  VerticalRectangle,
} from '@/shared/assets/icons/outline'
import { useAppDispatch } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import clsx from 'clsx'

import s from './MobileExpandPhoto.module.scss'

type Props = {
  className?: string
  currentAspect: number
  imageURL: string
}

export const MobileExpandPhoto = ({ className, currentAspect, imageURL }: Props) => {
  const dispatch = useAppDispatch()

  const handleChangeAspect = (aspect: number) => () => {
    dispatch(postsActions.updateImage({ aspect, imageURL }))
  }

  return (
    <div className={clsx(s.viewport, className)}>
      <Button
        className={clsx(s.item, { [s.activeItem]: currentAspect === 0 })}
        endIcon={<ImageIcon height={24} style={{ marginRight: '-3px' }} width={24} />}
        onClick={handleChangeAspect(0)}
        variant="text"
      >
        Original
      </Button>
      <Button
        className={clsx(s.item, { [s.activeItem]: currentAspect === 1 })}
        endIcon={<Square />}
        onClick={handleChangeAspect(1)}
        variant="text"
      >
        1:1
      </Button>
      <Button
        className={clsx(s.item, { [s.activeItem]: currentAspect === 4 / 5 })}
        endIcon={<VerticalRectangle />}
        onClick={handleChangeAspect(4 / 5)}
        variant="text"
      >
        4:5
      </Button>
      <Button
        className={clsx(s.item, { [s.activeItem]: currentAspect === 16 / 9 })}
        endIcon={<HorizontalRectangle />}
        onClick={handleChangeAspect(16 / 9)}
        variant="text"
      >
        16:9
      </Button>
    </div>
  )
}
