import React, { Component } from 'react'
import PropTypes            from 'prop-types'
// import update               from 'immutability-helper'
import Progress from './Progress.jsx'

/**
 * internal classname prefix
 * @type {string}
 */
export const CLASS_PREFIX =  'react-prez__'


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

  /**
   * render
   * @return {ReactComponent} render a presentation
   */
  render() {

    const { children } = this.props
    const length = children.length

    return (<div>
      <Progress length={ length } now={ 2 } />
      { this.props.children }
    </div>)
  }
}
