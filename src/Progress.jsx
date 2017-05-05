import React     from 'react'
import PropTypes from 'prop-types'

/**
 * Display presentation progress
 * @param {Props} props Given Props
 * @return {ReactComponent} Progress Component
 */
const Progress = props => {

  const { length, now } = props

  const barStyle = {
    display                  : 'block',
    position                 : 'fixed',
    top                      : 0,
    left                     : 0,
    width                    : `${100 * now / length}%`,
    height                   : '5px',
    backgroundColor          : '#4DD0E1',
    transitionDuration       : '.3s',
    transitionTimingFunction : 'ease-in-out',

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

Progress.propTypes = {
  length : PropTypes.number.isRequired,
  now    : PropTypes.number.isRequired,
}

export default Progress
