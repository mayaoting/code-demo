import React from "react"
class Mouse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0
    }
  }
  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })
  }
  render() {
    return (
      <div style={{height: '500px'}} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    )
  }
}

const RenderPropsDemo = () => {
  return (
    <div>
      <Mouse render={({x, y}) => <p> the position is x: {x}, y: {y}</p>}/>
    </div>
  )
}

export default RenderPropsDemo

/**
 * HOC vs Render props
 * HOC: 模式简单但是会增加组件层级
 * Render props: 代码简单， 但是理解起来较难
 * 按需使用
 */