import React from 'react'
import { DragDropContext } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Editor from './container/EditorPanel'
import Config from './container/ConfigPanel'
import Components from './container/ComponentsPanel'
import './App.css'

function App () {
  return (
    <div className='App'>
      <Components />
      <Editor />
      <Config />
    </div>
  )
}

export default DragDropContext(Backend)(App)
