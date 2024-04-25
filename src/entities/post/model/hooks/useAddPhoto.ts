import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useTranslation } from '@/shared/hooks'

export const useAddPhoto = (callback: (url: string) => void, errorCondition: boolean) => {
  const { t } = useTranslation()

  const [error, setError] = useState('')

  const handleSetPhoto = (file: File) => {
    if (errorCondition) {
      setError(t.pages.post.maxPost)

      return
    }

    if (!error) {
      callback(URL.createObjectURL(file))
    }
    setError('')
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      setError('')
    }
  }, [error])

  return { handleSetPhoto, setError, t }
}
