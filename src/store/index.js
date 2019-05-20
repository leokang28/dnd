import { observable, action, toJS } from 'mobx'
import shortid from 'shortid'

import { deepCopy } from '../lib/utils'

// 节点定义
const generatorNode = (props) => {
  const {
    uid = shortid.generate(), // 组件唯一标识
    name = '',
    type = '',
    event = {},
    attributes = {}, 
    children = [],
    ...rest
  } = props
  return {
    uid,
    name,
    type,
    event,
    attributes,
    children,
    extra: rest // 额外参数，一起带过去
  }
}

const root = generatorNode({
  name: 'BaseContainer'
})

class Global {
  @observable tree = [root]

  @observable lastDropedId = null // 记录上一次接收drop的容器id
  @observable current = null
  @action drop2container (component) {
    const node = generatorNode(component)
    const cache = deepCopy(this.tree)
    search(cache, this.lastDropedId, com => com.children.push(node))
    this.tree = cache
  }
  @action updateLastDropedId (id) {
    this.lastDropedId = id
  }

  /**
   *
   * @param {目标元素} id
   * @param {要覆盖的属性} obj
   * 这是一个狗💩函数，需要拆解
   */
  @action updateTarget (id, obj) {
    if (!id) return
    const { style = {}, event = {} } = obj
    const { deltax = 0, deltay = 0, ...rest } = style
    const cache = deepCopy(toJS(this.tree))
    search(cache, id, function callback (com) {
      if (deltax || deltay)
        Object.assign(com.attributes, { left: (com.attributes.left || 0) + (+deltax), top: (com.attributes.top || 0) + (+deltay) }, rest)
      Object.assign(com.attributes, rest)
      Object.assign(com.event, event)
    })
    // }
    this.tree = cache
  }
  @action setCurrent (v) {
    this.current = v
  }
  getNode (id) {
    const node = search(toJS(this.tree), id)
    return node
  }
}

function search (list = [], id, callback) {
  let result = null
  function dosearch (list = [], id, callback) {
    if (list.length === 0) {
      result = null
    }
    for (const component of list) {
      if (component.uid === id) {
        typeof callback === 'function' && callback(component)
        result = component
        break
      } else if (component.children) dosearch(component.children, id, callback)
    }
  }
  dosearch(list, id, callback)
  return result
}

export default new Global()
