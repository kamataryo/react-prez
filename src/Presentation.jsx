import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import update               from 'immutability-helper'
import keydown              from 'react-keydown'
import Progress     from './Progress.jsx'
import style        from './styles/presentation'
import buttonStyles from './styles/buttons'
import '../node_modules/github-markdown-css/github-markdown.css'
import '../node_modules/highlight.js/styles/atom-one-light.css'

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
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
  }

  /**
   * default values of props
   * @type {Object}
   */
  static defaultProps = {
    children: null
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
      max: this.props.children.length - 1
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
   * @return {void}
   */
  page(diff) {
    const next = diff + this.state.now
    if (-1 < next && next < this.state.max + 1) {
      this.setState(update(this.state, { now: { $set: next } }))
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
    if (this.state.swipeFromX + 80 < x) {
      return -1
    } else if (this.state.swipeFromX - 80 > x) {
      return +1
    } else {
      return 0
    }
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

    return (
      <div
        style={ presentationStype }
        className={ 'markdown-body' }
        onMouseDown={ e => this.page(e.pageX > window.innerWidth / 2 ? +1 : -1) }
        onTouchStart={ e => this.swipeStart(e.changedTouches[0].pageX) }
        onTouchEnd={ e => this.page(this.swipeEnd(e.changedTouches[0].pageX)) }
      >
        <Progress length={ this.state.max } now={ this.state.now } />

        <nav style={ { display: 'none' } }>
          <button
            id={ 'button-page-prev' }
            style={ buttonStyles.buttonPrev }
            onClick={ () => this.page(-1) }
          >{ 'prev' }</button>
          <button
            id={ 'button-page-next' }
            style={ buttonStyles.buttonNext }
            onClick={ () => this.page(+1) }
          >{ 'next' }</button>
        </nav>

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
    )
  }
}
