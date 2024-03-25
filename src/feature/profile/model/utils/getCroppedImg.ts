import { toast } from 'react-toastify'

import { LocaleType } from '@/../locales'

import { CroppedArea } from '../types/profile.types'

type Params = {
  crop?: CroppedArea
  fileName: string
  imageSrc: string
  t: LocaleType
}

export const getCroppedImg = ({ crop, fileName, imageSrc, t }: Params): Promise<FormData> => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.src = imageSrc

    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!crop) {
        canvas.width = image.naturalWidth
        canvas.height = image.naturalHeight

        if (ctx) {
          ctx.drawImage(image, 0, 0)
        }
      } else {
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
      }

      canvas.toBlob(blob => {
        if (!blob) {
          toast.error(t.validation.imgLoad)
          reject(new Error(t.validation.imgLoad))

          return
        }
        const formData = new FormData()

        formData.append(fileName, blob)
        resolve(formData)
      }, 'image/jpeg')
    }

    image.onerror = error => {
      toast.error(t.validation.imgLoad)
      reject(new Error(t.validation.imgLoad))
    }
  })
}
