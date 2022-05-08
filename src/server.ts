import Koa from 'koa'
import { exec } from 'child_process'

const app = new Koa()

app.use(async (ctx) => {
  exec(`zenity --notification --text='Request from ${ctx.request.ip}'`)
  ctx.body = 'Hello World\n'
})

app.listen(3000)
