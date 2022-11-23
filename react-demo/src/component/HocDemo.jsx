import React from "react";

const withMouth = (Component) => {
  class withMouseComponent extends React.Component {
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
          <Component {...this.props} mouse={this.state}/>
        </div>
      )
    }
  }
  return withMouseComponent

}

const APP = (props) => {
  const {x, y} = props.mouse
  return (
    <div style={{height: '500px'}}>mouse position is x: {x} y: {y}</div>
  )
}
export default withMouth(APP)
