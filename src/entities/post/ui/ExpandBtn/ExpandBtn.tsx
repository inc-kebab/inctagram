import { useAppDispatch } from '@/app/store/store'
import { Expand } from '@/shared/assets/icons/common'
import {
  HorizontalRectangle,
  Image as ImageIcon,
  Square,
  VerticalRectangle,
} from '@/shared/assets/icons/outline'
import { Button } from '@/shared/ui/Button'
import { Dropdown } from '@/shared/ui/DropDownMenu'
import clsx from 'clsx'

import s from './ExpandBtn.module.scss'

import { postsActions } from '../../model/slice/post-slice'

type Props = {
  className?: string
  classNameTrigger?: string
  currentAspect: number
  imageURL: string
}

export const ExpandBtn = ({ className, classNameTrigger, currentAspect, imageURL }: Props) => {
  const dispatch = useAppDispatch()

  const handleChangeAspect = (aspect: number) => () => {
    dispatch(postsActions.updateImage({ aspect, imageURL }))
  }

  return (
    <Dropdown.Menu
      align="start"
      className={clsx(s.viewport, className)}
      portal={false}
      side="top"
      sideOffset={2}
      trigger={
        <Button
          className={clsx(s.expandBtn, classNameTrigger)}
          startIcon={<Expand height={24} width={24} />}
          variant="text"
        />
      }
    >
      <Dropdown.Item
        className={clsx(s.item, { [s.activeItem]: currentAspect === 0 })}
        endIcon={<ImageIcon height={24} style={{ marginRight: '-3px' }} width={24} />}
        onSelect={handleChangeAspect(0)}
      >
        Original
      </Dropdown.Item>
      <Dropdown.Item
        className={clsx(s.item, { [s.activeItem]: currentAspect === 1 })}
        endIcon={<Square />}
        onSelect={handleChangeAspect(1)}
      >
        1:1
      </Dropdown.Item>
      <Dropdown.Item
        className={clsx(s.item, { [s.activeItem]: currentAspect === 4 / 5 })}
        endIcon={<VerticalRectangle />}
        onSelect={handleChangeAspect(4 / 5)}
      >
        4:5
      </Dropdown.Item>
      <Dropdown.Item
        className={clsx(s.item, { [s.activeItem]: currentAspect === 16 / 9 })}
        endIcon={<HorizontalRectangle />}
        onSelect={handleChangeAspect(16 / 9)}
      >
        16:9
      </Dropdown.Item>
    </Dropdown.Menu>
  )
}
