import React from 'react'
import { DragSource } from 'react-dnd'
import store from '../../store'

import { TYPE } from '../../lib/constance'
class DragSourceWrap extends React.Component {
  render () {
    const { children, connectDragSource, movable = true, style, onClick, id } = this.props
    const { left, top } = style || {}
    return connectDragSource(
      <div
        style={{
          position: movable ? 'absolute' : 'relative',
          height: 'auto',
          width: 'auto',
          left: left || 0,
          top: top || 0
        }}
        ref={connectDragSource}
        onClick={(e) => {
          e.stopPropagation()
          store.setCurrent(id)
        }}
      >
        {
          children
        }
      </div>
    )
  }
}

const Specification = {
  beginDrag: props => {
    return props
  },
  endDrag: (props, monitor) => {
    const { onDragEnd } = props
    const result = monitor.getDropResult()
    if (result) {
      typeof onDragEnd === 'function' && onDragEnd(result)
    }
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource(TYPE.EDITOR, Specification, collect)(DragSourceWrap)
