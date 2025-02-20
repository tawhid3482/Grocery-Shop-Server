import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'
import { boolean } from 'zod'

export interface TUser {
  id?: string
  name: string
  email: string
  password: string
  needsPasswordChange: boolean
  passwordChangeAt?: Date
  gender: 'male' | 'female' | 'other'
  photo: string
  role: 'admin' | 'user'
  lastSignInTime?: Date
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

export interface UserModel extends Model<TUser> {
  isUserExistByEmail(email: string): Promise<TUser>
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean
}

export type TUser_role = keyof typeof USER_ROLE
