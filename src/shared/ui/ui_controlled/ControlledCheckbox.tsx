import React, { FC } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/shared/ui/Checkbox'

export type ControlledCheckboxProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'checked' | 'id' | 'onValueChange'>

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  defaultValue = false,
  name,
  shouldUnregister,
  ...props
}): ControlledCheckboxProps<T> => {
  const {
    field: { onChange: onValueChange, value: checked },
  } = useController({
    control,
    defaultValue,
    name,
    shouldUnregister,
  })

  return <Checkbox checked={checked} id={name} onValueChange={onValueChange} {...props} />
}
