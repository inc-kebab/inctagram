import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { DatePicker, DatePickerProps } from '@/shared/ui/DatePicker'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<DatePickerProps, 'id' | 'onChange' | 'selected'>

export const ControlledDatePicker = <T extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const {
    field: { onChange, value, ...field },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return <DatePicker id={name} onChange={onChange} selected={value} {...rest} {...field} />
}
