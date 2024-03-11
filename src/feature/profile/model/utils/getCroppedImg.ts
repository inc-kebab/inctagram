import { toast } from 'react-toastify'

import { CroppedArea } from '@/feature/profile/model/types/profile.types'

type Params = {
  crop: CroppedArea
  fileName: string
  imageSrc: string
}

export const getCroppedImg = ({ crop, fileName, imageSrc }: Params): Promise<FormData> => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.src = imageSrc

    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const scaleX = image.naturalWidth / image.width
      const scaleY = image.naturalHeight / image.height

      canvas.width = crop.width
      canvas.height = crop.height

      if (ctx) {
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        )
      }

      canvas.toBlob(blob => {
        if (!blob) {
          toast.error('Ошибка при создании blob')
          reject(new Error('Ошибка при создании blob'))

          return
        }
        const formData = new FormData()

        formData.append(fileName, blob)
        resolve(formData)
      }, 'image/jpeg')
    }

    image.onerror = error => {
      toast.error('Ошибка при загрузке картинки:')
      reject(error)
    }
  })
}
