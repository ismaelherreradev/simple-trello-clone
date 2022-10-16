import { useState } from 'react'
import { NewItemForm } from './NewItemForm'
import { AddItemButton } from '../styles'
import type { AddNewItemProps } from '../types'

export function AddNewItem({ onAdd, toggleButtonText, dark }: AddNewItemProps) {
  const [showForm, setShowForm] = useState(false)

  if (showForm) {
    return (
      <NewItemForm
        onAdd={(text) => {
          onAdd(text)
          setShowForm(false)
        }}
      />
    )
  }

  return (
    <AddItemButton dark={dark} onClick={() => setShowForm(true)}>
      {toggleButtonText}
    </AddItemButton>
  )
}
