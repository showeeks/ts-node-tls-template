import tls from 'tls'
import { readFile } from 'fs/promises'

const init = async () => {
  const cert = await readFile('server.crt')
  const key = await readFile('server.pem')
  const server = tls.createServer({
    key,
    cert
  }, socket => {
    let time = (new Date()).toUTCString()
    const END = '\r\n\r\n'
    const text = "hello world";
    socket.write(`HTTP/1.1 200 OK\r\nServer: j\r\nDate: ${time}\r\nContent-Type: text/plain\r\nContent-Length: ${text.length}${END}${text}`)
    socket.end()
  })

  server.on('tlsClientError', (err, tlsSocket) => {
    console.log(err)
    tlsSocket.destroy()
  })

  server.listen(8443)
}

init().catch(console.error);