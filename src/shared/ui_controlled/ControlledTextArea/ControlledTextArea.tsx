import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextArea, TextAreaProps } from '@/shared/ui/TextArea'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextAreaProps, 'id' | 'onChange' | 'value'>

export const ControlledTextArea = <T extends FieldValues>({
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

  return <TextArea id={name} onChange={onChange} value={value} {...rest} {...field} />
}
