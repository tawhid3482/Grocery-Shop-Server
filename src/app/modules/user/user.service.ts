import { TUser } from './user.interface'
import { User } from './user.model'
import { generateAdminId, generatedUserId } from './user.utils'

const createUserIntoDB = async (payload: TUser) => {
  const userData: Partial<TUser> = {
    ...payload, // Merge payload data (if necessary)
    role: 'user',
    id: await generatedUserId(),
  };

  const result = await User.create(userData); // Remove array brackets
  return result;
};
const createAdminIntoDB = async (payload: TUser) => {
  const userData: Partial<TUser> = {
    ...payload, // Merge payload data (if necessary)
    role: 'admin',
    id: await generateAdminId(),
  };

  const result = await User.create(userData); // Remove array brackets
  return result;
};


const getAllUserFromDB = async () => {
  const result = await User.find().select('-password')
  return result
}

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findOne({ id }).select('-password')
  return result
}

export const UserServices = {
  createUserIntoDB,
  createAdminIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
}
