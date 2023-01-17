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

  res.send({
    created: true,
  })
})

router.get('/detail', async (req: Request, res: Response) => {
  const result = await profileCardService.fetchDetail(Number(req.query.id))

  res.send({
    profileCardDetail: {
      value: result.newResult,
      valueStructures: result.columnList,
      name: result.newResult.name,
    },
  })
})

router.post('/delete', async (req: Request, res: Response) => {
  await profileCardService.deleteProfile(req.body.profileCardId)

  res.sendStatus(200)
})

router.post('/update', async (req: Request, res: Response) => {
  const result = await profileCardService.updateProfile(
    req.body.profileCardId,
    req.body.newValue,
    req.body.parentDataKey,
    req.body.itemIndex
  )

  if (result) {
    res.send(true)
  } else {
    res.send(false)
  }
})

export { router as profileCardRouter }
