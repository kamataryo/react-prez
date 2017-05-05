import React     from 'react'
import PropTypes from 'prop-types'

/**
 * Display presentation progress
 * @param {Props} props Given Props
 * @return {ReactComponent} Progress Component
 */
const Progress = props => {

  const { length, now } = props

  return (
    <p
      className={ 'progress-text' }
      style={ { marginTop: 0 } }
    >{ `${now}/${length}` }</p>
  )
}

Progress.propTypes = {
  length : PropTypes.number.isRequired,
  now    : PropTypes.number.isRequired,
}

export default Progress
