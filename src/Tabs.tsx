import { useMemo } from 'react'
import { useTab, TabActionKind } from './tab-context'

type TabProps = { id: string }

function Tab({ id }: TabProps) {
  const tabContext = useTab()
  const { text } = tabContext.state.tabs[id]

  const changeText = (e: any) => {
    tabContext.dispatch(
      {
        type: TabActionKind.CHANGE_TEXT,
        payload: { text: e.target.value, id: id }
      })
  }

  const deleteTab = () => {
    tabContext.dispatch(
      {
        type: TabActionKind.DELETE_TAB,
        payload: { id: id }
      })
  }

  return (
    <div>
      <h2>{id}</h2>
      <h3>{tabContext.state[id]}</h3>
      <button onClick={deleteTab}>delete this tab</button>
      <input type="text" value={text} onChange={changeText} />
    </div>
  )
}


function Tabs() {
  const tabContext = useTab()
  /** need to create a unique id to use as the key for each tab */
  const createUUID = (): string => Math.random().toString(36).substring(7)

  const onTabClick = (id: string) => {
    console.log('show this tab as current', id)
    tabContext.dispatch({ type: TabActionKind.CURRENT_TAB, payload: { id } })
  }

  const createNewTab = () => {
    console.log('create a new tab and set as current')
    const id = createUUID()
    tabContext.dispatch({ type: TabActionKind.NEW_TAB, payload: { id, text: `new tab ${id}` } })
  }

  const currentTab = useMemo(() => Object.keys(tabContext.state.tabs)
    .filter((id) => id === tabContext.state.current)
    .map((id) => (
      <Tab key={id} id={id} />
    )), [tabContext.state.current, tabContext.state.tabs])

  return (
    <div>
      <button onClick={createNewTab}>create new tab</button>
      <p>all open tabs</p>
      {Object.keys(tabContext.state.tabs)
        .map((id) => (
          <button style={{
            backgroundColor:
              (tabContext.state.current === id ? "#24553b" : "#1a1a1a")
          }} key={id} id={id} onClick={() => onTabClick(id)}>
            id: {id}
          </button>
        ))}
      {currentTab}
    </div>
  )
}

export default Tabs
