import { AddNewItem } from './components/AddNewItem'
import { Column } from './components/Column'
import { AppContainer } from './styles'
import { useAppState } from './state/AppStateContext'
import { addList } from './state/actions'
import { CustomDragLayer } from './components/CustomDragLayer'

export function App() {
  const { lists, dispatch } = useAppState()

  return (
    <AppContainer>
      <CustomDragLayer />
      {lists.map(({ id, text }) => (
        <Column key={id} id={id} text={text} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch(addList(text))}
      />
    </AppContainer>
  )
}
