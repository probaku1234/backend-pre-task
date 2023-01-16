import express, { Request, Response } from 'express'
import * as profileCardService from '../../db/services/ProfileCardService'

interface profileCardListOutput extends Record<string, unknown> {
  name: string
}

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const current = Number(req.query.current as string)
  const columns = req.query.columns as string[]
  const pageSize = Number(req.query.pageSize as string)
  const sort = req.query.sort as string[]

  // console.log(current)
  // console.log(columns)
  // console.log(pageSize)
  // console.log(sort)

  const result = await profileCardService.getAll(
    current - 1,
    columns,
    pageSize,
    sort
  )
  const list: profileCardListOutput[] = []

  result.profiles.forEach((value) => {
    list.push({
      id: value.id,
      name: value.name,
      ...value.information,
      ...value.careers?.at(0)?.getDataValue('information'),
    })
  })

  res.send({
    list,
    total: result.totalPages,
  })
})

router.get('/columns', async (req: Request, res: Response) => {
  const result = await profileCardService.getColumns()

  res.send({
    columns: result,
  })
})

router.post('/create', async (req: Request, res: Response) => {
  const result = await profileCardService.createNewProfile(
    req.body.createTargetName
  )

  console.log(result)

  res.send({
    created: true,
  })
})

export { router as profileCardRouter }
