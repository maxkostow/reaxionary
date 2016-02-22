import React  from 'react'
import reaxionaryShape  from './utils/reaxionary_shape.js'

export default React.createClass({
  displayName: 'ReaxionaryProvider',

  propTypes: {
    reaxionary: reaxionaryShape
  },

  childContextTypes: {
    reaxionary: reaxionaryShape
  },

  getChildContext() {
    return {
      reaxionary: this.props.reaxionary
    }
  },

  render() {
    return React.Children.only(this.props.children)
  }
})
