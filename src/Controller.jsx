import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'
import './styles/Controller.css'

const CLASS_PREFIX = 'react__prez__controller__'

/**
 * noop
 * @param  {object} x arg
 * @return {pbject}   x
 */
const noop = x => x

/**
 * render presentation controller
 * @class {ReactComponent}
 */
export default class Controller extends Component {
  /**
   * Type checking
   * @type {Object}
   */
  static propTypes = {
    liftUpSendingMessage    : PropTypes.func,
    onButtonNextClick       : PropTypes.func,
    onButtonPrevClick       : PropTypes.func,
    onSocketMessageRecieved : PropTypes.func,
  }

  /**
   * Default values
   * @type {Object}
   */
  static defaultProps = {
    liftUpSendingMessage    : noop,
    onButtonPrevClick       : noop,
    onButtonNextClick       : noop,
    onSocketMessageRecieved : noop,
  }

  /**
   * constructor
   * @param  {Props} props initially given props
   * @return {void}
   */
  constructor(props) {
    super(props)
    this.state = {
      url        : 'ws://prez-socket.biwako.io/echo',
      recognizr  : '',
      username   : '',
      password   : '',
      connection : null,
      isToggled  : false,
    }
  }

  /**
   * componentWillMount
   * @return {void}
   */
  componentWillMount() {
    this.props.liftUpSendingMessage(this.sendMessage.bind(this))
  }

  /**
   * toggle controller unit
   * @param  {boolean} value open or close. false to close
   * @return {void}
   */
  _toggle(value) {
    this.setState(update(this.state, { isToggled : { $set: !!value } }))
  }

  /**
   * onChange handler
   * @param  {string} key   url, username, password
   * @param  {string} value values
   * @return {void}
   */
  _onFormChange(key, value) {
    this.setState(update(this.state, { [key]: { $set: value } }))
  }

  /**
   * connect to WebSocket Server
   * @param  {string} url      WebSocket URL
   * @param  {string} recognizr separative id to synchronize
   * @param  {string} username username
   * @param  {string} password password
   * @return {void}
   */
  connect(url, recognizr, username, password) {
    const connection = new WebSocket(url, ['soap'])
    connection.onopen = () => {
      const message = JSON.stringify({
        type: 'authentication',
        recognizr,
        username,
        password,
      })
      connection.send(message)
    }
    connection.onmessage = e => {
      const data = JSON.parse(e.data)

      switch (data.type) {
        case 'authorization':
          if (data.token) {
            this.setState(update(this.state, {
              connection : { $set: connection },
              token      : { $set: data.token },
            }))
          }
          break
        case 'downstream':
          this.props.onSocketMessageRecieved(data)
          break
        default:
          return
      }
    }

    connection.onclose = () => {
      this.setState(update(this.state, { connection: { $set: null } }))
    }
  }

  /**
   * sendMessage
   * @param {object} data sending data
   * @return {void}
   */
  sendMessage(data) {
    const { connection, token } = this.state
    const { pageNum } = data
    if (connection && token) {
      connection.send(JSON.stringify({ type: 'upstream', pageNum, token }))
    }
  }

  /**
   * Disconnect if has WebSocket connection
   * @return {void}
   */
  disconnect() {
    const { connection } = this.state
    if (!connection) {
      return
    }
    connection.close()
    this.setState(update(this.state, { connection: { $set: null } }))
  }

  /**
   * Render
   * @return {ReactDOMNode} DOM node
   */
  render() {

    const {
      onButtonPrevClick,
      onButtonNextClick
    } = this.props

    const {
      url,
      recognizr,
      username,
      password,
      isToggled,
    } = this.state

    const isConnected = !!this.state.connection

    return (
      <nav
        className={ CLASS_PREFIX + 'wrap' + (isToggled ? ' open' : ' close') }
      >
        <button
          id={ 'button-page-prev' }
          onClick={ onButtonPrevClick }
        >{ 'prev' }</button>
        <button
          id={ 'button-page-next' }
          onClick={ onButtonNextClick }
        >{ 'next' }</button>
        <button
          className={ CLASS_PREFIX + 'button-close' }
          onClick={ () => this._toggle(!isToggled) }
        >{ isToggled ? 'close' : 'open' }</button>
        {
          isConnected ? (
            <div className={ 'input-wrap' }>
              <button
                onClick={ () => this.disconnect() }
              >{ 'disconnect' }</button>
            </div>
          ) : (
            <div>
              <div className={ 'input-wrap' }>
                <label htmlFor={ 'url' }>{ 'WebSocket Endpoint' }</label><br />
                <input
                  type={ 'url' }
                  id={ 'url' }
                  value={ url }
                  onChange={ e => this._onFormChange('url', e.target.value) }
                />
              </div>
              <div className={ 'input-wrap' }>
                <label htmlFor={ 'recognizr' }>{ 'Recognizer' }</label><br />
                <input
                  type={ 'text' }
                  id={ 'recognizr' }
                  value={ recognizr }
                  onChange={ e => this._onFormChange('recognizr', e.target.value) }
                />
              </div>
              <div className={ 'input-wrap' }>
                <label htmlFor={ 'username' }>{ 'Username' }</label><br />
                <input
                  type={ 'text' }
                  id={ 'username' }
                  value={ username }
                  onChange={ e => this._onFormChange('username', e.target.value) }
                />
              </div>
              <div className={ 'input-wrap' }>
                <label htmlFor={ 'password' }>{ 'Password' }</label><br />
                <input
                  type={ 'password' }
                  id={ 'password' }
                  value={ password }
                  onChange={ e => this._onFormChange('password', e.target.value) }
                />
              </div>
              <div className={ 'input-wrap' }>
                <button
                  onClick={ () => this.connect(url, recognizr, username, password) }
                >{ 'connect' }</button>
              </div>
            </div>
          )
        }
      </nav>
    )
  }

}
