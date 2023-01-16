import { ProfileCard, Career } from '../models'
//import { ProfileCardOutput } from '../models/ProfileCard'

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
      //parentDataKey: 'information',
    })
  }

  for (const key in career.getDataValue('information')) {
    columnList.push({
      label: `careers-${key}`,
      dataKey: key,
      //parentDataKey: 'careers',
    })
  }

  return columnList
}

export const createNewProfile = async (name: string) => {
  return ProfileCard.create({ name, information: {} })
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
