import * as profileCardDal from '../dal/ProfileCard'
//import { ProfileCardOutput } from '../models/ProfileCard'

export const getAll = (
  current: number,
  columns: string[],
  pageSize: number,
  sort: string[]
) => {
  return profileCardDal.getAll(current, columns, pageSize, sort)
}

export const getColumns = () => {
  return profileCardDal.getColumns()
}

export const createNewProfile = (name: string) => {
  return profileCardDal.createNewProfile(name)
}

export const fetchDetail = (id: number) => {
  return profileCardDal.fetchDetail(id)
}

export const deleteProfile = (id: number) => {
  profileCardDal.deleteProfile(id)
}
