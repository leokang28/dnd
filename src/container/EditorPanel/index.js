import React from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'

import components from '../../components'
import store from '../../store'

const BaseContainer = components.BaseContainer

@observer
class Editor extends React.Component {
  export = () => {
    console.log(JSON.stringify(toJS(store.tree)))
  }
  render () {
    return (
      <div>
        <BaseContainer style={{ ...store.tree[0].attributes, width: '960px', height: '540px' }} movable={false} id={store.tree[0].uid} />
        <button onClick={this.export}>export</button>
      </div>
    )
  }
}

export default Editor
