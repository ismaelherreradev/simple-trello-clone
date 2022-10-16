import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { useImmerReducer } from 'use-immer'
import type { AppStateContextProps, AppState } from './../types'
import { appStateReducer } from './appStateReducer'

const appData: AppState = {
  draggedItem: null,
  lists: [
    {
      id: '0',
      text: 'To Do',
      task: [{ id: 'c0', text: 'Generate app scaffold' }],
    },
    {
      id: '1',
      text: 'In Progress',
      task: [{ id: 'c1', text: 'Learn Typescript' }],
    },
    {
      id: '2',
      text: 'Done',
      task: [{ id: 'c2', text: 'Begin to use static typing' }],
    },
  ],
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData)

  const { lists, draggedItem } = state

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.task || []
  }

  return (
    <AppStateContext.Provider
      value={{ lists, getTasksByListId, dispatch, draggedItem }}
    >
      {children}
    </AppStateContext.Provider>
  )
}

export function useAppState(): AppStateContextProps {
  return useContext(AppStateContext)
}
