import { createContext, useReducer, useContext } from 'react'

// type TabState = {
//   tabs: { [key: string]: { id: string, text: string } }
//   current: string
// }
type TabState = any
enum TabActionKind {
  NEW_TAB = 'NEW_TAB',
  CURRENT_TAB = 'CURRENT_TAB',
  CHANGE_TEXT = 'CHANGE_TEXT',
  DELETE_TAB = 'DELETE_TAB'
}

interface TabAction {
  type: TabActionKind;
  payload: { id: string, text?: string };
}

const TabContext = createContext<{ state: TabState, dispatch: any } | undefined>(undefined)

function tabReducer(state: TabState, action: TabAction) {
  switch (action.type) {
    case TabActionKind.NEW_TAB: {
      return {
        ...state, tabs:
        {
          ...state.tabs,
          [action.payload.id]:
            { id: action.payload.id, text: action.payload.text }
        },
        current: action.payload.id
      }
    }
    case TabActionKind.DELETE_TAB: {
      const { [action.payload.id]: _, ...tabs } = state.tabs

      return { ...state, tabs }
    }
    case TabActionKind.CURRENT_TAB: {
      return { ...state, current: action.payload.id }
    }
    case TabActionKind.CHANGE_TEXT: {
      return {
        ...state, tabs:
        {
          ...state.tabs, [action.payload.id]:
          {
            ...state.tabs[action.payload.id], text: action.payload.text
          }
        }
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const initialState = { tabs: {}, current: '' }

function TabProvider({ children }: any) {
  const [state, dispatch] = useReducer(tabReducer, initialState)

  const value = { state, dispatch }

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>
}

function useTab() {
  const context = useContext(TabContext)

  if (context === undefined) {
    throw new Error('useTab must be used within a TabProvider')
  }

  return context
}

export { TabProvider, useTab, TabActionKind }
