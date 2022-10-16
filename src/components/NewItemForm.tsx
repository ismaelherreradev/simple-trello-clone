import { useState } from 'react'
import { NewItemButton, NewItemFormContainer, NewItemInput } from '../styles'
import { useFocus } from '../hooks/useFocus'
import type { NewItemFromProps } from './../types'

export function NewItemForm({ onAdd }: NewItemFromProps) {
  const [text, setText] = useState('')
  const inputRef = useFocus()

  const handleAddText = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onAdd(text)
    }
  }

  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleAddText}
      />
      <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  )
}
