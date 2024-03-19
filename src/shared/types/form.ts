import { FieldValues, UseFormReset, UseFormSetError } from 'react-hook-form'

export type UseFormRef<T extends FieldValues, P = {}> = {
  reset: UseFormReset<T>
  setError: UseFormSetError<T>
} & Partial<T> &
  P
