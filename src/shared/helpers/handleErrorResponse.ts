import { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { toast } from 'react-toastify'

import { ResponseError } from '@/feature/auth/model/types/api.types'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const handleErrorResponse = <T extends FieldValues>({
  error,
  setError,
}: {
  error: FetchBaseQueryError | SerializedError
  setError?: UseFormSetError<T>
}) => {
  if ('data' in error && setError) {
    const { errorDescription } = error.data as ResponseError

    errorDescription.forEach(({ field, message }) => {
      setError(String(field) as 'root' | `root.${string}` | Path<T>, { message })
    })
  } else if ('error' in error) {
    toast.error(error.error)
  } else if ('message' in error) {
    toast.error(error.message)
  }
}
