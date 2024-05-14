import { DraftPost, TitleBlock, postsActions } from '@/entities/post'
import { Stores, addDraftPost } from '@/entities/post/model/services/saveDraftPost'
import { MAX_SIZE_IMAGE_20MB } from '@/shared/const/sizes'
import { photoSchema } from '@/shared/helpers'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { PhotoUploader } from '@/shared/ui/PhotoUploader'

export const UploadImagesScreen = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const handleSetPhoto = (file: File) => {
    addDraftPost<DraftPost>(Stores.DRAFT_POST, {
      croppedImages: [],
      id: Stores.DRAFT_POST,
      images: [file],
      imagesWithFilters: [],
      window: 'expand',
    })
    dispatch(postsActions.addImage(URL.createObjectURL(file)))
    dispatch(postsActions.setWindow('expand'))
  }

  return (
    <>
      <TitleBlock title={t.pages.post.addPhoto} />
      <PhotoUploader setPhoto={handleSetPhoto} zodSchema={photoSchema(t, MAX_SIZE_IMAGE_20MB)} />
    </>
  )
}
