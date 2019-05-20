function search (list = [], id) {
  if (list.length === 0) return null
  for (const component of list) {
    if (component.id === id) {
      // 直接return还是更新store ？
      component.children.push({id: 'something new'})
      // typeof callback === 'function' && callback(component.children)
      return component
    }
    if (component.children) return search(component.children, id)
  }
}

const data = [
  {
    id: 'a',
    children: [
      {
        id: 'b'
      },
      {
        id: 'c',
        children: []
      }
    ]
  }
]

search(data, 'c')
console.log(JSON.stringify(data))