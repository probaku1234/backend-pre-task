import { ProfileCard, Career } from '../models'
import { ProfileCardOutput } from '../models/ProfileCard'

interface IColumn {
  label: string
  dataKey: string
  type?: string
  parentDataKey?: string
}

export const getAll = async (
  current: number,
  columns: string[],
  pageSize: number,
  sort: string[]
) => {
  const { limit, offset } = getPagination(current, pageSize)

  if (sort.at(0) != 'name') {
    sort[0] = `information.${sort.at(0)}`
  }

  const result = await ProfileCard.findAndCountAll({
    include: {
      model: Career,
      as: 'careers',
      order: [['created_at', 'DESC']],
      limit: 1,
    },
    order: [[sort[0], sort[1].toUpperCase()]],
    limit,
    offset,
    logging: console.log,
  })

  const response = getPaginationData(result, current, limit)
  return response
}

export const getColumns = async () => {
  const result = await ProfileCard.findOne()
  const career = await Career.findOne()

  if (!result || !career) {
    throw new Error()
  }

  const information = result.getDataValue('information')
  const columnList: IColumn[] = []

  for (const key in information) {
    columnList.push({
      label: key,
      dataKey: key,
      type: 'single',
      //parentDataKey: 'information',
    })
  }

  for (const key in career.getDataValue('information')) {
    columnList.push({
      label: `careers-${key}`,
      dataKey: key,
      type: 'list',
      //parentDataKey: 'careers',
    })
  }

  return columnList
}

export const createNewProfile = async (name: string) => {
  return ProfileCard.create({ name, information: {} })
}

export const fetchDetail = async (id: number) => {
  const result = await ProfileCard.findByPk(id, {
    include: {
      model: Career,
      as: 'careers',
    },
  })

  if (!result) {
    throw new Error()
  }

  const information = result.getDataValue('information')
  const columnList: IColumn[] = []

  for (const key in information) {
    let type
    if (key == 'DOB') {
      type = 'date'
    } else if (key == 'email') {
      type = 'email'
    } else if (key == 'phone') {
      type = 'phone'
    } else {
      type = 'text'
    }

    columnList.push({
      label: key,
      dataKey: key,
      type,
    })
  }

  if (!result.careers) {
    result.careers = []
  }
  const newResult: Record<string, unknown> & ProfileCardOutput = {
    name: result.name,
    id: result.id,
    information: result.information,
    created_at: result.created_at,
    updated_at: result.updated_at,
    deleted_at: result.deleted_at,
    ...result.information,
  }

  columnList.push({
    label: 'career',
    dataKey: 'careerList',
    parentDataKey: 'career',
    type: 'list',
  })

  const careerList: Record<string, unknown>[] = []
  result.careers.forEach((career) => {
    careerList.push({
      ...career.information,
    })
  })
  newResult['careerList'] = careerList

  const career = await Career.findOne()
  if (!career) {
    throw new Error('')
  }

  for (const key in career.getDataValue('information')) {
    let type

    if (key == 'start_date' || key == 'end_date') {
      type = 'date'
    } else {
      type = 'text'
    }
    columnList.push({
      label: key,
      dataKey: key,
      type,
      parentDataKey: 'careerList',
    })
  }

  return { newResult, columnList }
}

export const deleteProfile = async (id: number) => {
  const result = await ProfileCard.findByPk(id, {
    include: {
      model: Career,
      as: 'careers',
    },
  })

  result?.destroy()
}

const getPagination = (current: number, pageSize: number) => {
  const limit = pageSize
  const offset = current ? current * limit : 0

  return { limit, offset }
}

const getPaginationData = (
  data: { rows: ProfileCard[]; count: number },
  current: number,
  limit: number
) => {
  const { count: totalItems, rows: profiles } = data
  const currentPage = current ? +current : 0
  const totalPages = Math.ceil(totalItems / limit)

  return { totalItems, profiles, totalPages, currentPage }
}
