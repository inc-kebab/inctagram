import React, { useState } from 'react'

import { TextArea } from '@/shared/ui/TextArea'

export const Description = () => {
  const [text, setText] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextArea
        label="Add publication descriptions"
        onChange={e => setText(e.target.value)}
        value={text}
      />
    </form>
  )
}
