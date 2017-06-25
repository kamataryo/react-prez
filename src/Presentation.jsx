import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import update               from 'immutability-helper'
import keydown              from 'react-keydown'
import Progress     from './Progress'
import Controller   from './Controller'
import style        from './styles/presentation'

/**
 * Webpack CSS bundle
 */
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/atom-one-light.css'

/**
 * enable to detect keydown
 * @type {Decorator}
 */
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
    children         : PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    progressBarStyle : PropTypes.object,
    style            : PropTypes.object,
  }

  /**
   * default values of props
   * @type {Object}
   */
  static defaultProps = {
    children         : null,
    progressBarStyle : {},
    style            : {},
  }

  /**
   * constructor
   * @param  {Props} props firstly given props
   * @return {void}
   */
  constructor(props) {
    super(props)
    this.state = {
      now: 0,
      max: this.props.children.length - 1,
      sendMessage: null,
    }
  }

  /**
   * componentWillReceiveProps
   * @param  {KeyDown} keydown KeyDown Object
   * @return {void}
   */
  componentWillReceiveProps({ keydown }) {
    if (keydown && keydown.event) {
      const { code } = keydown.event
      if (code === 'ArrowRight') {
        this.page(+1)
      } else if (code === 'ArrowLeft') {
        this.page(-1)
      }
    }
  }

  /**
   * do paging
   * @param  {number} diff +1, -1, ..
   * @param  {boolean} preventSendingMessage stop sendMessage
   * @return {void}
   */
  page(diff, preventSendingMessage) {
    if (diff === 0) {
      return
    }
    const next = diff + this.state.now
    const { max, sendMessage } = this.state
    if (-1 < next && next < max + 1) {
      this.setState(update(this.state, { now: { $set: next } }))
      if (typeof sendMessage === 'function' && !preventSendingMessage) {
        // websocket
        sendMessage({ pageNum: next })
      }
    }
  }

  /**
   * Judge swipe direction
   * @param  {number} x pageX where swipe start
   * @return {void}
   */
  swipeStart(x) {
    this.setState(update(this.state, { swipeFromX: { $set: x } }))
  }

  /**
   * decide swipe direction
   * @param  {number} x pageX where sipe end
   * @return {number}   +1: right, -1: left
   */
  swipeEnd(x) {
    if (this.state.swipeFromX + 120 < x) {
      return -1
    } else if (this.state.swipeFromX - 120 > x) {
      return +1
    } else {
      return 0
    }
  }

  /**
   * Fire after downstream message revieved
   * @param  {Object} data recieved data
   * @return {void}
   */
  _onSocketMessageRecieved(data) {
    this.page(data.pageNum - this.state.now, true)
  }

  /**
   * render
   * @return {ReactComponent} render a presentation
   */
  render() {

    const presentationStype = {
      ...style.defaultPresentationStyle,
      ...this.props.style,
      ...style.absolutePresentationStyle,
    }
    const { progressBarStyle } = this.props

    return (
      <div>
        <Controller
          onButtonPrevClick={ () => this.page(-1) }
          onButtonNextClick={ () => this.page(+1) }
          onSocketMessageRecieved={ this._onSocketMessageRecieved.bind(this) }
          liftUpSendingMessage={ func => this.setState(update(this.state, { sendMessage: { $set: func } })) }
        />
        <div
          style={ presentationStype }
          className={ 'markdown-body' }
          onMouseDown={ e => this.page(e.pageX > window.innerWidth / 2 ? +1 : -1) }
          onTouchStart={ e => this.swipeStart(e.changedTouches[0].pageX) }
          onTouchEnd={ e => this.page(this.swipeEnd(e.changedTouches[0].pageX)) }
        >
          <Progress length={ this.state.max } now={ this.state.now } style={ progressBarStyle } />

          {
            this.props.children.map((child, i) => {
              const style = { display: (i === this.state.now ? 'block' : 'none') }
              return (
                <div
                  key={ `content${i}` }
                  style={ style }
                >{ child }</div>
              )
            })
          }

        </div>

      </div>
    )
  }
}
