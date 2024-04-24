import { ChangeEvent, ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { ZodEffects } from 'zod'

type Props = {
  children: ReactNode
  multiple?: boolean
  setError?: (error: string) => void
  setFile: (file: File) => void
  zodSchema: ZodEffects<any>
} & ComponentPropsWithoutRef<'input'>

export const InputFile = forwardRef<ElementRef<'input'>, Props>(
  ({ children, multiple, setError, setFile, zodSchema, ...props }: Props, ref) => {
    const onMultipleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const filesArray = Array.from(e.target.files, file => file)

        filesArray.forEach(file => {
          const validationResult = zodSchema.safeParse(file)

          if (validationResult.success) {
            setFile(file)
          } else {
            setError?.(validationResult.error.errors[0].message)
          }
        })
      }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0]
        const validationResult = zodSchema.safeParse(file)

        if (validationResult.success) {
          setFile(file)
        } else {
          setError?.(validationResult.error.errors[0].message)
        }
      }
    }

    return (
      <label htmlFor={props.name}>
        <input
          id={props.name}
          multiple={multiple}
          onChange={multiple ? onMultipleChangeHandler : onChangeHandler}
          ref={ref}
          style={{ display: 'none' }}
          type="file"
          {...props}
        />
        {children}
      </label>
    )
  }
)
