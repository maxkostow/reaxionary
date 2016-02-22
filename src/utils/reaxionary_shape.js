import React from 'react'
import Rx from 'rx'

export default React.PropTypes.shape({
  callbacks: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
  source: React.PropTypes.instanceOf(Rx.Observable).isRequired
}).isRequired
