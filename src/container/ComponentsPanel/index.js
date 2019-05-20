import React from 'react'
import shortid from 'shortid'
// import { toJS } from 'mobx'

import components from '../../components'
import store from '../../store'

// import { obj2arr } from '../../lib/utils'

class Components extends React.Component {
  render () {
    const _render = []
    for (const i in components) {
      const Component = components[i]
      _render.push(
        <Component
          movable={false}
          key={shortid.generate()}
          onDragEnd={() => {
            store.drop2container({ name: i })
          }}
        />
      )
    }
    // const arr = obj2arr(components)
    return (
      <div>
        {
          _render
        }
      </div>
    )
  }
}

export default Components
