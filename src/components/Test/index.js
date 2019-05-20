import React from 'react'
import GragSource from '../DragSource'
import { toJS } from 'mobx'

import store from '../../store'

class Test extends React.Component {
  render () {
    const { event, style } = this.props
    const { left, top, ...rest } = style || {}
    // console.log(style, 'Test Component')
    return (
      <GragSource
        onDragEnd={this.props.onDragEnd}
        movable={this.props.movable}
        id={this.props.id}
        style={{ left, top }}
      >
        <h1 style={rest}>Test</h1>
      </GragSource>
    )
  }
}

export default Test
