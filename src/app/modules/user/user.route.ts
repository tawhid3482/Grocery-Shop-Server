import express from 'express'
import { userControllers } from './user.controller'
import validationRequest from '../../middlewares/validationRequest'
import { userValidation } from './user.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constant'

const router = express.Router()

router.post(
  '/users',
  validationRequest(userValidation.userValidationSchema),
  userControllers.createUser,
)
router.post(
  '/admin',
  auth('admin'),
  validationRequest(userValidation.userValidationSchema),
  userControllers.createAdmin,
)
router.get('/users/:id',auth(USER_ROLE.admin), userControllers.getSingleUser)

router.get('/users', auth(USER_ROLE.admin), userControllers.getAllUser)

router.get('/me', auth('user','admin'), userControllers.getMe)

router.get('/change-status/:id', auth('admin'),validationRequest(userValidation.changeStatusValidationSchema), userControllers.changeStatus)





export const userRoutes = router
