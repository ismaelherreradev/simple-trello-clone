import { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { throttle } from 'throttle-debounce-ts'
import { useItemDrag } from '../hooks/useItemDrag'
import { moveTask, setDraggedItem } from '../state/actions'
import { useAppState } from '../state/AppStateContext'
import { CardContainer } from '../styles'
import type { CardProps } from '../types'
import { isHidden } from '../utils/isHidden'

export function Card({ text, id, columnId, isPreview }: CardProps) {
  const { draggedItem, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)

  const { drag } = useItemDrag({
    type: 'CARD',
    id,
    text,
    columnId,
  })

  const [, drop] = useDrop({
    accept: 'CARD',
    hover: throttle(200, () => {
      if (!draggedItem) return
      if (draggedItem.type !== 'CARD') return
      if (draggedItem.id === id) return

      dispatch(moveTask(draggedItem.id, id, draggedItem.columnId, columnId))
      dispatch(setDraggedItem({ ...draggedItem, columnId }))
    }),
  })

  drag(drop(ref))

  return (
    <CardContainer
      ref={ref}
      isPreview={isPreview}
      isHidden={isHidden(draggedItem, 'CARD', id, isPreview)}
    >
      {text}
    </CardContainer>
  )
}
