import React from 'react'
import { DropTarget } from 'react-dnd'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'

import { TYPE } from '../../lib/constance'
import { snapToGrid } from '../../lib/utils'
import store from '../../store'
import components from '../../components'
import DragSource from '../DragSource'

@observer
class BaseContainer extends React.Component {
  isCurrent (monitor) {
    const { isOverCurrent, id } = this.props
    const source = monitor.getItem()
    if (!source) return
    const { movable } = source
    if (isOverCurrent && !monitor.didDrop()) {
      const delta = monitor.getDifferenceFromInitialOffset()
      store.updateLastDropedId(id)
      if (movable) {
        store.updateTarget(source.id, {
          style: {
            deltax: snapToGrid(delta.x),
            deltay: snapToGrid(delta.y)
          }
        })
      }
    }
  }

  render () {
    const { id, connectDropTarget, canDrop, isOver, style, onDragEnd, movable, isOverCurrent } = this.props
    console.log(style, 'Base Container')
    const isActive = canDrop && isOver
    let backgroundColor = 'rgba(0,0,0,.1)'
    if (isActive && isOverCurrent) {
      backgroundColor = 'darkgreen'
    } else if (canDrop) {
      backgroundColor = 'darkkhaki'
    }
    const node = store.getNode(id)
    const { left, top, ...rest } = style || {}
    console.log(rest)
    return (
      <DragSource
        movable={movable}
        onDragEnd={onDragEnd}
        style={movable && { left, top }}
        id={id}
      >
        {
          connectDropTarget(
            <div
              className='base-container-for-drop'
              style={{ height: '200px', width: '500px', position: 'relative', backgroundColor, ...rest }}
              ref={connectDropTarget}
            >
              {
              // 根据当前的组件id去store树里读取children渲染
                // console.log(node) &&
                node &&
                // node.children &&
                node.children.length > 0 &&
                node.children.map(obj => {
                  const Component = components[obj.name]
                  return <Component movable key={obj.uid} id={obj.uid} style={toJS(obj.attributes)} />
                })
              }
            </div>
          )
        }
      </DragSource>
    )
  }
}

const Specification = {
  drop: (props, monitor, component) => {
    if (!component) {
      return
    }
    component.isCurrent && component.isCurrent(monitor, component)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  isOverCurrent: monitor.isOver({ shallow: true })
})

export default DropTarget(TYPE.EDITOR, Specification, collect)(BaseContainer)
