import WebSocket from 'ws'
import jwt       from 'jsonwebtoken'

const privateKey = 'some private key'

/**
 * push all active connection
 * @type {Array<{origin:string,recognizr:string,socket:Socket}>}
 */
let connects = []

/**
 * anycast
 * @param  {string} origin    protocol://host:port
 * @param  {string} recognizr identifier to make presentation container
 * @param  {Socket} self      self to eliminate
 * @param  {object} message   [sending message
 * @return {void}
 */
const anycast = (origin, recognizr, self, message) => {
  connects
    .filter(connect => (
        connect.socket !== self &&
        connect.origin === origin &&
        connect.recognizr === recognizr
      ))
    .forEach(({ socket }) => {
      socket.send(JSON.stringify(message))
    })
}

const wss = new WebSocket.Server({
  port : 3001,
  path : '/echo',
})

wss.on('connection', socket => {
  socket.on('close', () => {
    connects = connects.filter(connect => connect.socket !== socket)
  })

  socket.on('message', message => {
    console.log('connect')
    const data = JSON.parse(message)
    const recognizr = data.recognizr ? data.recognizr : ''
    const origin = socket.upgradeReq.headers.origin

    switch (data.type) {
      case 'authentication':
        if (data.username === 'admin' && data.password === 'admin') {
          console.log('[auth] successed')
          connects.push({ origin, recognizr, socket })
          jwt.sign(
            { username: data.username },
            privateKey,
            { expiresIn: '3h' },
            (err, token) => {
              if (err) {
                socket.close()
              }
              const response = {
                type : 'authorization',
                token
              }
              socket.send(JSON.stringify(response))
            }
          )
        } else {
          console.log('[auth] failed')
          const response = {
            type    : 'authorization',
          }
          socket.send(JSON.stringify(response))
        }
        break
      case 'upstream':
        console.log('upstream')
        jwt.verify(data.token, privateKey, err => {
          if (err) {
            socket.close()
          }
          anycast(
            origin,
            recognizr,
            socket,
            {
              type: 'downstream',
              pageNum: data.pageNum,
            })
        })
        break
      default:
    }
  })
})
