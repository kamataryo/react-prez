import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import update               from 'immutability-helper'
import keydown from 'react-keydown'
import Progress from './Progress.jsx'

@keydown
/**
 * Define Presentation Component
 * @return {ReactComponent} React Component
 */
export default class Presentation extends Component {

  /**
   * props type check
   * @type {Object}
   */
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  /**
   * default values of props
   * @type {Object}
   */
  static defaultProps = {
    children: null
  }

  constructor(props) {
    super(props)
    this.state = {
      now: 0,
      max: this.props.children.length - 1
    }
  }

  page(diff) {
    const next = diff + this.state.now
    if (-1 < next && next < this.state.max + 1) {
      this.setState(update(this.state, { now: { $set: next } }))
    }
  }

  componentWillReceiveProps({ keydown }) {
    if (keydown.event) {
      const { code } = keydown.event
      if (code === 'ArrowRight') {
        this.page(+1)
      } else if (code === 'ArrowLeft') {
        this.page(-1)
      }
    }
  }

  /**
   * render
   * @return {ReactComponent} render a presentation
   */
  render() {

    return (<div style={ { width: '100vw', height: '100vh', backgroundColor: 'salmon' } }>
      <Progress length={ this.state.max } now={ this.state.now } />
      <nav>
        <button
          id={ 'prev' }
          onClick={ () => this.page(-1) }
        >{ 'prev' }</button>
        <button
          id={ 'next' }
          onClick={ () => this.page(+1) }
        >{ 'next' }</button>
      </nav>
      { this.props.children[this.state.now] }
    </div>)
  }
}
