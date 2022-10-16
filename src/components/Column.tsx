import { AddNewItem } from './AddNewItem'
import { Card } from './Card'
import { ColumnContainer, ColumnTitle } from '../styles'
import { useAppState } from '../state/AppStateContext'
import type { ColumnProps } from './../types'
import { addTask, moveList, moveTask, setDraggedItem } from './../state/actions'
import { useRef } from 'react'
import { useItemDrag } from '../hooks/useItemDrag'
import { useDrop } from 'react-dnd'
import { throttle } from 'throttle-debounce-ts'
import { isHidden } from '../utils/isHidden'

export function Column({ id, text, isPreview }: ColumnProps) {
  const { draggedItem, getTasksByListId, dispatch } = useAppState()
  const tasks = getTasksByListId(id)
  const ref = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop({
    accept: ['COLUMN', 'CARD'],
    hover: throttle(200, () => {
      if (!draggedItem) return
      if (draggedItem.type === 'COLUMN') {
        if (draggedItem.id === id) return

        dispatch(moveList(draggedItem.id, id))
      } else {
        if (draggedItem.columnId === id) return
        if (tasks.length) return
        dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id))
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }))
      }
    }),
  })

  const { drag } = useItemDrag({ type: 'COLUMN', id, text })

  drag(drop(ref))

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(draggedItem, 'COLUMN', id, isPreview)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card columnId={id} text={task.text} key={task.id} id={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another card"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  )
}
