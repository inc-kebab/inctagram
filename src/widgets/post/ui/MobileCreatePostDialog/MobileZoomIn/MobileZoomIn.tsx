import { useEffect, useState } from 'react'

import { postsActions } from '@/entities/post'
import { Maximize } from '@/shared/assets/icons/outline'
import { useAppDispatch } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Dropdown } from '@/shared/ui/DropDownMenu'
import { Slider } from '@/shared/ui/Slider'

import s from './MobileZoomIn.module.scss'

type Props = {
  aspect: number
  imageURL: string
  zoom: number
}

export const MobileZoomIn = ({ aspect, imageURL, zoom }: Props) => {
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (zoom !== 1) {
      setOpen(true)
    }
  }, [zoom])

  const handleChangeOpen = (open: boolean) => {
    setOpen(open)

    if (open && aspect === 0) {
      dispatch(postsActions.updateImage({ aspect: 0.1 / 0.1, imageURL }))
    }
  }

  const handleChangeZoom = (value: number[]) => {
    dispatch(postsActions.updateImage({ imageURL, zoom: value[0] }))
  }

  return (
    <Dropdown.Menu
      align="start"
      className={s.viewport}
      modal={false}
      onOpenChange={handleChangeOpen}
      open={open}
      portal={false}
      side="top"
      sideOffset={2}
      style={{ width: '250px' }}
      trigger={
        <Button
          className={s.expandBtn}
          startIcon={<Maximize height={24} width={24} />}
          variant="text"
        />
      }
    >
      <Dropdown.Item className={s.item} onSelect={e => e.preventDefault()}>
        <Slider
          max={2.5}
          min={1}
          onValueChange={handleChangeZoom}
          sliderThumbClass={s.sliderThumbClass}
          sliderTrackClass={s.sliderTrackClass}
          step={0.01}
          value={[zoom]}
        />
      </Dropdown.Item>
    </Dropdown.Menu>
  )
}
