import { DragItem } from '../types'

export function isHidden(
  draggedItem: DragItem | null,
  itemType: string,
  id: string,
  isPreview?: boolean
) {
  return Boolean(
    !isPreview &&
      draggedItem &&
      draggedItem.type === itemType &&
      draggedItem.id === id
  )
}
