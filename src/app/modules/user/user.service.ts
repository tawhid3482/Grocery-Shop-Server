import { TUser } from './user.interface'
import { User } from './user.model'

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload)
  return result
}
const getAllUserFromDB = async () => {
  const result = await User.find()
  return result
}
const getSingleUserFromDB = async (id: string) => {
  const result = await User.findOne({id})
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
}
