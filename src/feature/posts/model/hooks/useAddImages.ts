import { useAppDispatch } from '@/app/store/store'

import { useAddImagesMutation } from '../../api/posts-api'
import { postsActions } from '../../api/posts-slice'

export const useAddImages = () => {
  const dispatch = useAppDispatch()

  const [addImages, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess }] =
    useAddImagesMutation()

  const handleAddPhoto = async (formData: FormData) => {
    // console.log('formData', Object.fromEntries(formData))
    const response = await addImages(formData)
    const file = formData.get('files') as Blob | null

    if (file && 'data' in response) {
      const imageURL = URL.createObjectURL(file)

      console.log({ imageURL: imageURL, uploadId: response.data.images[0].uploadId })

      dispatch(
        postsActions.addImage({ imageURL: imageURL, uploadId: response.data.images[0].uploadId })
      )
    }
  }

  return { handleAddPhoto, isUpdateLoading, isUpdateSuccess }
}
