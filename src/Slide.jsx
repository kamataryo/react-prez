import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import update               from 'immutability-helper'
import request              from 'superagent'
import marked               from 'marked'
import Loading              from './Loading.jsx'
import style                from './styles/slide'

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
      'domnode', 'html', 'markdown'
    ])
  }

  /**
   * default values of props
   * @type {Object}
   */
  static defaultProps = {
    children : null,
    src      : '',
    type     : 'domnode',
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
    if (this.props.src === '') {
      switch (this.props.type) {
        case 'domnode':
        case 'html':
          return this.setState(update(this.state, { content: { $set: this.props.children } }))
        case 'markdown':
          return this.setState(update(this.state, { content: { $set: marked(this.props.children) } }))
        default:
          return
      }
    } else {
      request
        .get(this.props.src)
        .end((err, res) => {
          if (!err) {
            switch (this.props.type) {
              case 'html':
                return this.setState(update(this.state, { content: { $set: res.text } }))
              case 'markdown':
                return this.setState(update(this.state, { content: { $set: marked(res.text) } }))
              default:
                return
            }
          }
        })
    }
  }

  /**
   * render
   * @return {ReactComponent} render a presentation
   */
  render() {

    const slideStype = {
      ...style.defaultSlideStyle,
      ...this.props.style,
      ...style.absoluteSlideStyle,
    }


    if (this.state.content) {
      return (
        <div
          style={ slideStype }
          dangerouslySetInnerHTML={ { __html: this.state.content } }
        />
      )
    } else {
      return (
        <div style={ slideStype }>
          <Loading />
        </div>
      )
    }

  }
}
