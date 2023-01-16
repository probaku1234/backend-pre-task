import { ProfileCard, Career } from './models'

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV !== 'test'

const dbInit = () =>
  Promise.all([
    ProfileCard.sync({ alter: isDev || isTest, logging: console.log }),
    Career.sync({ alter: isDev || isTest, logging: console.log }),
  ])

export default dbInit
