import type { Dispatch } from 'react'

export type Task = {
  id: string
  text: string
}

export type List = Task & {
  task: Task[]
}

export type AppState = {
  draggedItem: DragItem | null
  lists: List[]
}

export type NewItemFromProps = {
  onAdd(text: string): void
}

export type ColumnProps = Task & { isPreview?: boolean }

export type CardProps = Task & {
  columnId: string
  isPreview?: boolean
}

export type AddNewItemProps = NewItemFromProps & {
  toggleButtonText: string
  dark?: boolean
}

export type Item = {
  id: string
}

export type AddItemButtonProps = {
  dark?: boolean
}

// Drag
export type ColumnDragItem = Task & {
  type: 'COLUMN'
}

export type DragPreviewContainerProps = {
  isHidden?: boolean
  isPreview?: boolean
}

export type DragPreviewWrapperProps = {
  position: {
    x: number
    y: number
  }
}

export type CardDragItm = Task & {
  columnId: string
  type: 'CARD'
}

export type DragItem = ColumnDragItem | CardDragItm

// AppStateContext
export type AppStateContextProps = {
  lists: List[]
  getTasksByListId(id: string): Task[]
  dispatch: Dispatch<Actions>
  draggedItem: DragItem | null
}

// Add list actions
export type Actions =
  | { type: 'ADD_LIST'; payload: string }
  | { type: 'ADD_TASK'; payload: { text: string; listId: string } }
  | { type: 'MOVE_LIST'; payload: { draggedId: string; hoverId: string } }
  | { type: 'SET_DRAGGED_ITEM'; payload: DragItem | null }
  | {
      type: 'MOVE_TASK'
      payload: {
        draggedItemId: string
        hoveredItemId: string | null
        sourceColumnId: string
        targetColumnId: string
      }
    }
