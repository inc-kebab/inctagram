import { ComponentPropsWithoutRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './TextArea.module.scss'

type TextAreaProps = {
  classNameTextArea?: string
  error?: string
  label?: string
  resize?: 'both' | 'horizontal' | 'none' | 'vertical'
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { className, classNameTextArea, disabled, error, label, id = label, resize = 'both', ...props },
    ref
  ) => {
    const classes = {
      container: clsx(s.container, className),
      label: clsx(s.label, { [s.disabled]: disabled }),
      textarea: clsx({ [s.error]: error }, s.textarea, classNameTextArea),
    }

    return (
      <div className={classes.container}>
        {label && (
          <label className={classes.label} htmlFor={id}>
            {label}
          </label>
        )}
        <textarea
          className={classes.textarea}
          disabled={disabled}
          id={id}
          ref={ref}
          style={{ resize: resize }}
          {...props}
        ></textarea>
        {error && <span className={s.errorSpan}>{error}</span>}
      </div>
    )
  }
)
