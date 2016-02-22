import React from 'react'
import reaxionaryShape from './utils/reaxionary_shape.js'

export default function (reaxionaryMapper, Component) {
  return React.createClass({
    displayName: 'ReaxionaryConnector',

    contextTypes: {
      reaxionary: reaxionaryShape
    },

    componentWillMount() {
      this.unsubscribe = this.context.reaxionary.source.subscribe(this.handleChange)
    },

    componentWillUnmount() {
      this.unsubscribe()
    },

    render() {
      return React.createElement(Component, this.state.props, this.props.children)
    },

    handleChange(reaxionaryState) {
      this.setState({
        props: reaxionaryMapper(this.props, reaxionaryState, this.context.reaxionary.callbacks)
      })
    }
  })
}
