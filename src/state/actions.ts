import type { Actions, DragItem } from './../types'

export function addTask(text: string, listId: string): Actions {
  return {
    type: 'ADD_TASK',
    payload: {
      text,
      listId,
    },
  }
}

export function addList(text: string): Actions {
  return {
    type: 'ADD_LIST',
    payload: text,
  }
}

export function moveList(draggedId: string, hoverId: string): Actions {
  return {
    type: 'MOVE_LIST',
    payload: {
      draggedId,
      hoverId,
    },
  }
}

export function setDraggedItem(draggedItem: DragItem | null): Actions {
  return {
    type: 'SET_DRAGGED_ITEM',
    payload: draggedItem,
  }
}

export function moveTask(
  draggedItemId: string,
  hoveredItemId: string | null,
  sourceColumnId: string,
  targetColumnId: string
): Actions {
  return {
    type: 'MOVE_TASK',
    payload: {
      draggedItemId,
      hoveredItemId,
      sourceColumnId,
      targetColumnId,
    },
  }
}
