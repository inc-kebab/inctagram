import { toast } from 'react-toastify'

import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

interface FieldError<T extends Record<string, any>> {
  field: keyof T
  message: string
}

interface ResponseError<T extends Record<string, any>> {
  errorDescription?: FieldError<T>[]
  message?: string
  statusCode: number
  timestamp: string
}

interface CatchingData<T extends Record<string, any>> {
  error: Nullable<string>
  fieldErrors: Nullable<FieldError<T>[]>
}

const getValidError = <T extends Record<string, any>>(errorData: ResponseError<T>) => {
  let errorMsg = errorData.message || 'Server error: error message was not received'

  if (errorMsg === 'Http Exception') {
    errorMsg = errorData.errorDescription?.[0].message || 'Http Exception'
  }

  return errorMsg
}

export const handleErrorResponse = <T extends Record<string, any>>(
  error?: FetchBaseQueryError | SerializedError
): CatchingData<T> | undefined => {
  if (!error) {
    return
  }

  switch (true) {
    case 'error' in error: {
      const errorMsg = `${error.status} - ${error.error}`

      toast.error(errorMsg)

      return {
        error: errorMsg,
        fieldErrors: null,
      }
    }
    case 'message' in error: {
      const errorMsg =
        `${error.code} - Serialized error:` + (error.message || 'error message was not received')

      toast.error(errorMsg)

      return {
        error: errorMsg,
        fieldErrors: null,
      }
    }
    case 'data' in error: {
      const errorData = error.data as ResponseError<T>

      const validErrorMsg = getValidError(errorData)

      const errorMsg = `${error.status} - ${validErrorMsg}`

      toast.error(errorMsg)

      return {
        error: errorMsg,
        fieldErrors: errorData.errorDescription || null,
      }
    }
    default: {
      const errorMsg = 'Unknown error: error message and status error was not received'

      toast.error(errorMsg)

      return {
        error: 'Unknown error: error message and status error was not received',
        fieldErrors: null,
      }
    }
  }
}
