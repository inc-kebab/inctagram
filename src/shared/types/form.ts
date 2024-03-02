import { FieldValues, UseFormReset, UseFormSetError } from 'react-hook-form'

export type UseFormRef<T extends FieldValues> = {
  reset: UseFormReset<T>
  setError: UseFormSetError<T>
} & T
