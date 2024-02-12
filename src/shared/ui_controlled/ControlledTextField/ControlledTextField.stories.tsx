import type { Meta, StoryObj } from '@storybook/react'

import { CSSProperties } from 'react'
import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/shared/ui_controlled/ControlledTextField/ControlledTextField'

const meta = {
  component: ControlledTextField,
  title: 'shared/ControlledTextField',
} as Meta<typeof ControlledTextField>

export default meta
type Story = StoryObj<typeof meta>

type FormValues = {
  email: string
  password: string
}

export const ExampleWithForm: Story = {
  args: {} as any,
  render: () => {
    const { control, handleSubmit } = useForm<FormValues>()

    const onSubmit = (data: FormValues) => {
      alert(JSON.stringify(data))
    }

    const styles: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '400px',
      rowGap: '20px',
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} style={styles}>
        <span>Form With Controlled Text Fields</span>
        <ControlledTextField
          control={control}
          defaultValue=""
          label="Email"
          name="email"
          rules={{ required: 'Email is required' }}
          type="email"
        />
        <ControlledTextField
          control={control}
          label="Password"
          name="password"
          rules={{ required: 'Password is required' }}
        />
        <button style={{ color: 'black', marginTop: '24px' }}>Send</button>
      </form>
    )
  },
}
