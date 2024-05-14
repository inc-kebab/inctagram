import { useEffect, useState } from 'react'

import {
  DraftPost,
  Stores,
  TitleBlock,
  createDraftPost,
  getStoreData,
  initDB,
  postsActions,
} from '@/entities/post'
import { MAX_SIZE_IMAGE_20MB } from '@/shared/const/sizes'
import { photoSchema } from '@/shared/helpers'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { PhotoUploader } from '@/shared/ui/PhotoUploader'

export const UploadImagesScreen = () => {
  const { t } = useTranslation()

  const [isDBReady, setIsDBReady] = useState(false)

  const [isDraftExist, setIsDraftExist] = useState(false)

  const dispatch = useAppDispatch()

  const handleSetPhoto = (file: File) => {
    void createDraftPost<DraftPost>(Stores.DRAFT_POST, {
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
    if (isDBReady) {
      getStoreData<DraftPost>(Stores.DRAFT_POST).then(res => {
        const newState = res[0]

        dispatch(postsActions.initDraftPost(newState))
      })
    }
  }

  useEffect(() => {
    initDB().then(res => setIsDBReady(res))
  }, [])

  useEffect(() => {
    if (isDBReady) {
      getStoreData<DraftPost>(Stores.DRAFT_POST).then(res => {
        if (res.length) {
          setIsDraftExist(true)
        }
      })
    }
  }, [isDBReady])

  return (
    <>
      <TitleBlock title={t.pages.post.addPhoto} />
      {isDraftExist ? (
        <button onClick={handleGetDraft}>get indexeddb data</button>
      ) : (
        <PhotoUploader setPhoto={handleSetPhoto} zodSchema={photoSchema(t, MAX_SIZE_IMAGE_20MB)} />
      )}
    </>
  )
}
