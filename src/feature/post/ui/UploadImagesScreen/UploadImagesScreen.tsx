import { MAX_SIZE_IMAGE_20MB, postsActions } from '@/entities/post'
import { photoSchema } from '@/shared/helpers'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { PhotoUploader } from '@/shared/ui/PhotoUploader'

import { CurrentWindow } from '../../model/types/post.types'
import { TitleBlock } from '../TitleBlock/TitleBlock'

interface Props {
  onChangeWindow?: (window: CurrentWindow) => void
}

export const UploadImagesScreen = ({ onChangeWindow }: Props) => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const handleSetPhoto = (file: File) => {
    dispatch(postsActions.addImage(URL.createObjectURL(file)))
    onChangeWindow?.('expand')
  }

  return (
    <>
      <TitleBlock title={t.pages.post.addPhoto} />
      <PhotoUploader setPhoto={handleSetPhoto} zodSchema={photoSchema(t, MAX_SIZE_IMAGE_20MB)} />
    </>
  )
}
