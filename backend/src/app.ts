import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'
import { router } from './routes'

const app = express()
app.use(express.json())

app.use('/', router)

export { app }
