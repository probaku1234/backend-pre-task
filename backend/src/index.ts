import { app } from './app'
import dbInit from './db/init'

const port = 4000

const start = async () => {
  dbInit()
    .then(() => {
      app.listen(port, () => {
        console.log(`Listening on port ${port}!!!!!!!!`)
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

start()
