import express, { Request, Response } from 'express'
import * as profileCardService from '../../db/services/ProfileCardService'

interface profileCardListOutput extends Record<string, unknown> {
  name: string
}

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.get('/columns', async (req: Request, res: Response) => {
  try {
    const result = await profileCardService.getColumns()

    res.send({
      columns: result,
    })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.post('/create', async (req: Request, res: Response) => {
  try {
    const result = await profileCardService.createNewProfile(
      req.body.createTargetName
    )

    if (!result) {
      res.send({
        created: false,
      })
      return
    }

    res.send({
      created: true,
    })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.get('/detail', async (req: Request, res: Response) => {
  try {
    const result = await profileCardService.fetchDetail(Number(req.query.id))

    res.send({
      profileCardDetail: {
        value: result.newResult,
        valueStructures: result.columnList,
        name: result.newResult.name,
      },
    })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.post('/delete', async (req: Request, res: Response) => {
  try {
    await profileCardService.deleteProfile(req.body.profileCardId)

    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.post('/update', async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

export { router as profileCardRouter }
