import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'

/**
 * noop
 * @param  {object} x dis
 * @return {pbject}   [description]
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
      url        : 'ws://localhost:3001/echo',
      recognizr  : '',
      username   : '',
      password   : '',
      connection : null
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
    } else {
      console.log('NO CONNECTION')
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
      password
    } = this.state

    const isConnected = !!this.state.connection

    return (
      <nav
        style={ { display: 'block', position: 'fixed' } }
      >
        <button
          id={ 'button-page-prev' }
          onClick={ onButtonPrevClick }
        >{ 'prev' }</button>
        <button
          id={ 'button-page-next' }
          onClick={ onButtonNextClick }
        >{ 'next' }</button>
        {
          isConnected ? (
            <p>
              <button
                onClick={ () => this.disconnect() }
              >{ 'disconnect' }</button>
            </p>
          ) : (
            <p>
              <input
                type={ 'url' }
                value={ url }
                onChange={ e => this._onFormChange('url', e.target.value) }
              />
              <input
                type={ 'recognizr' }
                value={ recognizr }
                onChange={ e => this._onFormChange('recognizr', e.target.value) }
              />
              <input
                type={ 'text' }
                value={ username }
                onChange={ e => this._onFormChange('username', e.target.value) }
              />
              <input
                type={ 'password' }
                value={ password }
                onChange={ e => this._onFormChange('password', e.target.value) }
              />
              <button
                onClick={ () => this.connect(url, recognizr, username, password) }
              >{ 'connect' }</button>
            </p>
          )
        }
      </nav>
    )
  }

}
