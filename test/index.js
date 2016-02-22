import Rx from 'rx'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import expect from 'expect.js'
import Provider from '../src/Provider.js'
import connect from '../src/connect.js'

describe('apps/reaxionary', function () {
  it('should connect to the observable', function () {
    let subject = new Rx.BehaviorSubject({
      count: 0
    })
    let reaxionary = {
      source: subject.asObservable(),
      callbacks: {
        inc: function () {
          subject.onNext({
            count: subject.getValue().count + 1
          })
        }
      }
    }
    function reaxionaryMapper(componentProps, reaxionaryState, reaxionaryCallbacks) {
      return {
        id: componentProps.id,
        count: reaxionaryState.count,
        inc: reaxionaryCallbacks.inc
      }
    }
    let Dumb = React.createClass({
      displayName: 'Dumb',
      propTypes: {
        id: React.PropTypes.string.isRequired,
        count: React.PropTypes.number.isRequired,
        inc: React.PropTypes.func.isRequired
      },
      render: function () {
        return React.createElement(
          'div',
          {
            ref: this.props.id,
            onClick: this.props.inc
          },
          '' + this.props.count
        )
      }
    })

    let rendered = TestUtils.renderIntoDocument(
      React.createElement(
        Provider,
        { reaxionary },
        React.createElement(
          connect(reaxionaryMapper, Dumb),
          { id: 'test' }
        )
      )
    )
    let dumbComponent = TestUtils.findRenderedComponentWithType(rendered, Dumb)
    expect(dumbComponent.refs.test.textContent).to.eql('0')
    TestUtils.Simulate.click(dumbComponent.refs.test)
    expect(dumbComponent.refs.test.textContent).to.eql('1')
  })
})
