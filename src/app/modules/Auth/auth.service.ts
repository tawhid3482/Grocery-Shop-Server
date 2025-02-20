import config from '../../config'
import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import httpStatus from 'http-status'
import { createToken } from './auth.utils'
import { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const loginUserFromClientSite = async (payload: TLoginUser) => {
  const userData = await User.isUserExistByEmail(payload.email)
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'this user is not found!')
  }
  if (userData?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is already deleted!')
  }
  //   // checking if the user is block
  if (userData.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is already blocked!')
  }

  // checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, userData?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!')
  }

  const jwtPayload = {
    userEmail: userData?.email,
    role: userData?.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: userData?.needsPasswordChange,
  }
}

const changePasswordIntoDB = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  console.log(user)
  const userData = await User.isUserExistByEmail(user.userEmail)
  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, 'this user is not found!')
  }
  if (userData?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is already deleted!')
  }
  //   // checking if the user is block
  if (userData.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is already blocked!')
  }

  // checking if the password is correct

  if (
    !(await User.isPasswordMatched(payload?.oldPassword, userData?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!')
  }
  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  await User.findOneAndUpdate(
    {
      email: user.userEmail,
      role: user.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange:false,
      passwordChangeAt:new Date()
    },
  )
  return null
}

export const authServices = {
  loginUserFromClientSite,
  changePasswordIntoDB,
}
