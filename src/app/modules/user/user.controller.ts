import { Request, Response } from 'express'
import { UserServices } from './user.service'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'

const createUser = catchAsync(async (req, res) => {
  // // console.log(req.file)
  // console.log(req.body)
  const result = await UserServices.createUserIntoDB(req.file,req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})
const createAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.createAdminIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUserFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await UserServices.getSingleUserFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  })
})

const getMe = catchAsync(async (req, res) => {
  const { userEmail, role } = req.user

  if (!userEmail && !role) {
    throw new AppError(httpStatus.NOT_FOUND, 'Access data not found!')
  }

  const result = await UserServices.getMeFromDB(userEmail, role)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'You retrieved successfully',
    data: result,
  })
})

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await UserServices.changeStatusIntoDB(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated successfully',
    data: result,
  })
})

export const userControllers = {
  createUser,
  createAdmin,
  getAllUser,
  getSingleUser,
  getMe,
  changeStatus,
}
