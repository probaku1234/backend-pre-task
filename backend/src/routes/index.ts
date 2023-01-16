import express from 'express'
import { profileCardRouter } from './profileCard'

const router = express.Router()

router.use('/profile-card', profileCardRouter)

export { router }
