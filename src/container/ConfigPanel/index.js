import React from 'react'
import { observer } from 'mobx-react'

import store from '../../store'
import * as components from '../../components'
import { dash2camel } from '../../lib/utils'

const { Attr } = components

@observer
class ConfigPanel extends React.Component {
  state = {
    key: '',
    value: ''
  }
  render () {
    const node = store.getNode(store.current)
    const { attributes = {} } = node || {}
    return (
      <div>
        {
          store.current
        }
        {
          Object.keys(attributes).map(key => <Attr type={typeof attributes[key]} key={key} title={key} value={attributes[key]} onChange={value => {
            const obj = {
              style: {},
              event: {}
            }
            obj.style[key] = value
            store.updateTarget(store.current, obj)
          }} />)
        }
        <div>
          <p>add attr</p>
          <p>attrname: <input onChange={e => this.setState({ key: e.target.value })} /></p>
          <p>attrvalue: <input onChange={e => this.setState({ value: e.target.value })} /></p>
          <button onClick={() => {
            const { key, value } = this.state
            const style = {}
            style[dash2camel(key)] = value
            store.updateTarget(store.current, {
              style
            })
          }}>add</button>
        </div>
        <div>
          <p>add event handler</p>
          <p>event: <input onChange={e => this.setState({ key: e.target.value })} /></p>
          <p>hanlder: <input onChange={e => this.setState({ value: e.target.value })} /></p>
          <button onClick={() => {
            const { key, value } = this.state
            const style = {}
            style[dash2camel(key)] = value
            store.updateTarget(store.current, {
              style
            })
          }}>add</button>
        </div>
      </div>
    )
  }
}

export default ConfigPanel
