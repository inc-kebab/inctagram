import { useEffect } from 'react'
import { FieldErrors, SetValueConfig } from 'react-hook-form'

type Args<T> = {
  errors: FieldErrors<Record<keyof T, string>>
  getValues: () => Record<keyof T, boolean | string>
  locale: string | undefined
  setValue: (name: keyof T, value: boolean | string, options: SetValueConfig) => void
}

export const useResetValues = <T>({ errors, getValues, locale, setValue }: Args<T>) => {
  useEffect(() => {
    const values = getValues()

    Object.keys(values).forEach(fieldName => {
      if (fieldName in errors) {
        setValue(fieldName as keyof T, values[fieldName as keyof T], {
          shouldValidate: true,
        })
      }
    })
  }, [locale])
}
