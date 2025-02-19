import { model, Schema } from 'mongoose'
import { TUser } from './user.interface'

const userSchema = new Schema<TUser>({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  needsPasswordChange: { type: Boolean, default: true },
  passwordChangeAt: { type: Date },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not correct gender',
    },
  },
  photo: { type: String, required: true },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: '{VALUE} is not correct role',
    },
  },
  lastSignInTime: { type: String, required: false },
  status: {
    type: String,
    enum: {
      values: ['in-progress', 'blocked'],
      message: '{VALUE} is not correct status',
    },
  },
  isDeleted: { type: Boolean, default: false },
})

export const User = model<TUser>('user', userSchema)
