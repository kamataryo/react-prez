import React     from 'react'
import PropTypes from 'prop-types'

/**
 * Display presentation progress
 * @param {Props} props Given Props
 * @return {ReactComponent} Progress Component
 */
const Progress = props => {

  const { length, now, style } = props

  const defaultBarStyle = {
    height                   : '8px',
    backgroundColor          : '#4dd0e1',
    transitionDuration       : '.3s',
    transitionTimingFunction : 'ease-in-out',
  }

  const absoluteStyle = {
    display  : 'block',
    position : 'fixed',
    top      : 0,
    left     : 0,
    width    : `${100 * now / length}%`,
  }

  const barStyle = {
    ...defaultBarStyle,
    ...style,
    ...absoluteStyle,
  }

  return (
    <div
      className={ 'progress-text' }
      style={ { margin: 0 } }
    >
      <div style={ barStyle } />
    </div>
  )
}

/**
 * Type checking
 * @type {Object}
 */
Progress.propTypes = {
  length : PropTypes.number.isRequired,
  now    : PropTypes.number.isRequired,
  style  : PropTypes.object,
}

Progress.defaultProps = {
  style: {},
}

export default Progress
