import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import update               from 'immutability-helper'
import request              from 'superagent'
import Loading              from './Loading.jsx'
/**
 * Define Slide Component
 * @return {ReactComponent} React Component
 */
export default class Slide extends Component {

  /**
   * props type check
   * @type {Object}
   */
  static propTypes = {
    children : PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    src      : PropTypes.string,
    type     : PropTypes.oneOf([
      'text', 'html', 'markdown'
    ])
  }

  /**
   * default values of props
   * @type {Object}
   */
  static defaultProps = {
    children : null,
    src      : '',
    type     : 'text',
  }

  /**
   * Constructor
   * @param  {Props} props given Props
   * @return {void}
   */
  constructor(props) {
    super(props)
    this.state = {}
  }

  /**
   * Component Will Mount
   * @return {void}
   */
  componentWillMount() {
    if (this.props.src !== '') {
      request
        .get(this.props.src)
        .end((err, res) => {
          if (!err) {
            this.setState(update(this.state, { content: { $set: res.text } }))
          }
        })
    }
  }

  /**
   * render
   * @return {ReactComponent} render a presentation
   */
  render() {
    const { children, src, type } = this.props
    const content = src ?
      (this.state.content ? this.state.content : <Loading />) :
      children

    let result
    if (type === 'text') {
      result = (
        <div className={ 'slide' }>
          { content }
        </div>
      )
    } else if (type === 'html') {
      /* eslint-disable react/no-danger */
      result = <div className={ 'slide' } dangerouslySetInnerHTML={ { __html: content } } />
    } else if (type === 'markdown') {
      // parse markdown here
      result = <div className={ 'slide' } dangerouslySetInnerHTML={ { __html: content } } />
    }

    return result
  }
}
