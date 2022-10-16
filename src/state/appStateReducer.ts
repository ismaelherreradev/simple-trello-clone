import type { Actions, AppState } from './../types'
import { findItemIndexById, moveItem } from './../utils/arrayUtils'
import { nanoid } from 'nanoid'

export function appStateReducer(
  draft: AppState,
  actions: Actions
): AppState | void {
  switch (actions.type) {
    case 'ADD_LIST': {
      draft.lists.push({
        id: nanoid(),
        text: actions.payload,
        task: [],
      })
      break
    }
    case 'ADD_TASK': {
      const { text, listId } = actions.payload
      const targetListIndex = findItemIndexById(draft.lists, listId)

      draft.lists[targetListIndex].task.push({
        id: nanoid(),
        text,
      })
      break
    }
    case 'MOVE_LIST': {
      const { draggedId, hoverId } = actions.payload
      const dragIndex = findItemIndexById(draft.lists, draggedId)
      const hoverIndex = findItemIndexById(draft.lists, hoverId)
      draft.lists = moveItem(draft.lists, dragIndex, hoverIndex)
      break
    }
    case 'SET_DRAGGED_ITEM': {
      draft.draggedItem = actions.payload
      break
    }
    case 'MOVE_TASK': {
      const { draggedItemId, hoveredItemId, sourceColumnId, targetColumnId } =
        actions.payload

      const sourceListIndex = findItemIndexById(draft.lists, sourceColumnId)
      const targetListIndex = findItemIndexById(draft.lists, targetColumnId)

      const dragIndex = findItemIndexById(
        draft.lists[sourceListIndex].task,
        draggedItemId
      )
      const hoverIndex = hoveredItemId
        ? findItemIndexById(draft.lists[targetListIndex].task, hoveredItemId)
        : 0

      const item = draft.lists[sourceListIndex].task[dragIndex]

      draft.lists[sourceListIndex].task.splice(dragIndex, 1)
      draft.lists[targetListIndex].task.splice(hoverIndex, 0, item)
      break
    }
    default: {
      break
    }
  }
}
