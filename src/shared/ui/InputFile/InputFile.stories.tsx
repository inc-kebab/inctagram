import type { StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Button } from '@/shared/ui/Button'
import { InputFile } from '@/shared/ui/InputFile/InputFile'
import z from 'zod'

const meta = {
  argTypes: {
    children: {
      description: 'React node component serving as a trigger for an input.',
    },
    setError: {
      description: 'A function that takes an error as a string in its arguments.',
    },
    setFile: {
      action: 'file upload',
      description: 'A function that sets the selected file.',
    },
    zodSchema: {
      description: 'A Zod schema for validating the input file.',
    },
  },
  component: InputFile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'shared/InputFile',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <Button asComponent="span">input file</Button>,
    zodSchema: z.instanceof(File) as any,
  },
}

export const Controlled: Story = {
  args: {
    children: <Button asComponent="span">input file</Button>,
    zodSchema: z.instanceof(File) as any,
  },
  render: () => {
    const [file, setFile] = useState<Nullable<File>>(null)

    return (
      <>
        <InputFile setError={() => {}} setFile={setFile} zodSchema={z.instanceof(File) as any}>
          <Button asComponent="span">input file</Button>
        </InputFile>

        <div style={{ marginBottom: '10px', marginTop: '10px' }}>Name: {file?.name}</div>
        <div>Size: {file?.size}</div>
      </>
    )
  },
}
