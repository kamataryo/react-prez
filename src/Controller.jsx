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
   * @param  {string} username username
   * @param  {string} password password
   * @return {void}
   */
  connect(url, username, password) {
    const connection = new WebSocket(url, ['soap'])
    connection.onopen = () => {
      const message = JSON.stringify({
        type: 'authentication',
        username,
        password,
      })
      connection.send(message)
    }
    connection.onmessage = e => {
      const message = JSON.parse(e.data)
      if (!message.success) {
        return
      }
      const { onSocketMessageRecieved } = this.props
      switch (message.type) {
        case 'authorization':
          return this.setState(update(this.state, { connection: { $set: connection } }))
        case 'downstream':
          return onSocketMessageRecieved(message.data)
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
    const { connection } = this.state
    if (connection) {
      connection.send(JSON.stringify(data))
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
                onClick={ () => this.connect(url, username, password) }
              >{ 'connect' }</button>
            </p>
          )
        }
      </nav>
    )
  }

}
