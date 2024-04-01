import { useDispatch } from 'react-redux'

import { Maximize } from '@/shared/assets/icons/outline'
import { Button } from '@/shared/ui/Button'

import s from './ZoomIn.module.scss'

import { postsActions } from '../../model/slice/post-slice'

type Props = {
  aspect: number
  imageURL: string
  zoom: number
}

export const ZoomIn = ({ aspect, imageURL, zoom }: Props) => {
  const dispatch = useDispatch()

  const handleSetAspect = () => {
    if (aspect === 0) {
      dispatch(postsActions.updateImage({ aspect: 1, imageURL }))
    }
  }

  return (
    <Button
      className={s.expandBtn}
      disabled={aspect !== 0}
      onClick={handleSetAspect}
      startIcon={<Maximize height={24} width={24} />}
      variant="text"
    >
      x{zoom}
    </Button>
  )
}
