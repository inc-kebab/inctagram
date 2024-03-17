import { useState } from 'react'

import { useAddImagesMutation } from '../../api/posts-api'

export const useAddImages = () => {
  // const [addImages, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess }] =
  //   useAddImagesMutation()

  const [arr, setArr] = useState<string[]>([])
  const handleAddPhoto = (data: FormData) => {
    const file = data.get('file') as Blob | null

    if (file) {
      const imageURL = URL.createObjectURL(file)

      setArr(prev => [...prev, imageURL])
    }
  }

  return { arr, handleAddPhoto }
}
