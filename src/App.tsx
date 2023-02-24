import './App.css'
import { TabProvider } from './tab-context'
import Tabs from './Tabs'

function App() {
  return (
    <div className="App">
      <h1>Tabs with persistant state</h1>
      <TabProvider>
        <Tabs />
      </TabProvider>
    </div>
  )
}

export default App
