import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Maximize } from '@/shared/assets/icons/outline'
import { Button } from '@/shared/ui/Button'
import { Dropdown } from '@/shared/ui/DropDownMenu'
import { Slider } from '@/shared/ui/Slider'
import clsx from 'clsx'

import s from './ZoomIn.module.scss'

import { postsActions } from '../../model/slice/post-slice'

type Props = {
  className?: string
  classNameTrigger?: string
  imageURL: string
  setZoom: (zoom: number) => void
  zoom: number
}

export const ZoomIn = ({ className, classNameTrigger, imageURL, setZoom, zoom }: Props) => {
  const dispatch = useDispatch()

  const [open, openChange] = useState(false)

  const handleSetAspect = () => {
    dispatch(postsActions.updateImage({ aspect: 1, imageURL }))
  }

  return (
    <Dropdown.Menu
      align="start"
      className={clsx(s.viewport, className)}
      onOpenChange={(open: boolean) => {
        openChange(open)
        handleSetAspect()
      }}
      open={open}
      portal={false}
      side="top"
      sideOffset={2}
      trigger={
        <Button
          className={clsx(s.expandBtn, classNameTrigger)}
          startIcon={<Maximize height={24} width={24} />}
          variant="text"
        />
      }
    >
      <Dropdown.Item onSelect={(e: Event) => e.preventDefault()} style={{ cursor: 'initial' }}>
        <Slider
          className={s.slider}
          max={2.5}
          min={1}
          onValueChange={value => setZoom(value[0])}
          sliderThumbClass={s.sliderThumbClass}
          sliderTrackClass={s.sliderTrackClass}
          step={0.1}
          value={[zoom]}
        />
      </Dropdown.Item>
    </Dropdown.Menu>
  )
}
