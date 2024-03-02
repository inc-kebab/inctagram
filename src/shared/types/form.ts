import { FieldValues, UseFormReset, UseFormSetError } from 'react-hook-form'

export interface UseFormRef<T extends FieldValues> {
  reset: UseFormReset<T>
  setError: UseFormSetError<T>
}
