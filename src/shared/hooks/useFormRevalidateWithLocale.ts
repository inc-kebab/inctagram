import { useEffect } from 'react'
import { FieldErrors, FieldValues, Path, UseFormSetValue } from 'react-hook-form'

type Args<T extends FieldValues> = {
  errors: FieldErrors<T>
  locale?: string
  setValue: UseFormSetValue<T>
  values: T
}

export const useFormRevalidateWithLocale = <T extends FieldValues>({
  errors,
  locale,
  setValue,
  values,
}: Args<T>) => {
  useEffect(() => {
    Object.keys(values).forEach(fieldName => {
      if (fieldName in errors) {
        setValue(fieldName as Path<T>, values[fieldName as keyof T], {
          shouldValidate: true,
        })
      }
    })
  }, [locale])
}
