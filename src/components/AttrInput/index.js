import React from 'react'

class Attr extends React.Component {
  render () {
    const { title, value, onChange = () => {}, type } = this.props
    return (
      <div>
        <span>{title}</span>
        <input value={value} onChange={(e) => {
          let value = e.target.value
          if (type === 'number') {
            value = +value
          }
          onChange(value)
        }} />
      </div>
    )
  }
}

export default Attr
