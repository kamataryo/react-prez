import React, { Component } from 'react'
import PropTypes            from 'prop-types'
// import update               from 'immutability-helper'

/**
 * Define Progress Component
 * @return {ReactComponent} React Component
 */
export default class Progress extends Component {

  /**
   * props type check
   * @type {Object}
   */
  static propTypes = {
    length : PropTypes.number.isRequired,
    now    : PropTypes.number.isRequired,
  }

  /**
   * render
   * @return {ReactComponent} render a presentation
   */
  render() {

    const { length, now } = this.props

    return (
      <p style={ { marginTop: 0 } } className={ 'progress-text' }>{ `${now}/${length}` }</p>
    )
  }
}
