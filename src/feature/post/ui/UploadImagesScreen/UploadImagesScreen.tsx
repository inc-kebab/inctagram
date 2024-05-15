import { useEffect, useState } from 'react'

import {
  DraftPost,
  Stores,
  TitleBlock,
  getStoreData,
  postsActions,
  updateDraftPost,
} from '@/entities/post'
import { MAX_SIZE_IMAGE_20MB } from '@/shared/const/sizes'
import { photoSchema } from '@/shared/helpers'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { PhotoUploader } from '@/shared/ui/PhotoUploader'

import s from './UploadImagesScreen.module.scss'

export const UploadImagesScreen = () => {
  const { t } = useTranslation()

  const [isDraftExist, setIsDraftExist] = useState(false)

  const dispatch = useAppDispatch()

  const handleSetPhoto = (file: File) => {
    void updateDraftPost<DraftPost>(Stores.DRAFT_POST, {
      croppedImages: [],
      id: Stores.DRAFT_POST,
      images: [file],
      imagesWithFilters: [],
      window: 'expand',
    })
    dispatch(postsActions.addImage(URL.createObjectURL(file)))
    dispatch(postsActions.setWindow('expand'))
  }

  const handleGetDraft = () => {
    getStoreData<DraftPost>(Stores.DRAFT_POST).then(res => {
      if (res.length) {
        const newState = res[0]

        dispatch(postsActions.initDraftPost(newState))
      }
    })
  }

  useEffect(() => {
    getStoreData<DraftPost>(Stores.DRAFT_POST).then(res => {
      if (res.length) {
        setIsDraftExist(true)
      }
    })
  }, [])

  return (
    <>
      <TitleBlock title={t.pages.post.addPhoto} />
      <PhotoUploader setPhoto={handleSetPhoto} zodSchema={photoSchema(t, MAX_SIZE_IMAGE_20MB)}>
        {isDraftExist && (
          <Button className={s.button} fullWidth onClick={handleGetDraft} variant="outline">
            {t.button.openDraft}
          </Button>
        )}
      </PhotoUploader>
    </>
  )
}
