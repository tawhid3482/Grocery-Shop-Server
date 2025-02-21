import express from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { AuthValidation } from './auth.validation'
import { AuthControllers } from './auth.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.post(
  '/login',
  validationRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
)
router.post('/change-password', auth(USER_ROLE.admin,USER_ROLE.user), validationRequest(AuthValidation.changePasswordValidationSchema),AuthControllers.changePassword)

router.post(
  '/refresh-token',
  validationRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken
)
router.post(
  '/forget-password',
  validationRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword
)
router.post(
  '/reset-password',
  validationRequest(AuthValidation.resetPasswordValidationSchema),
  AuthControllers.resetPassword
)

export const AuthRoutes = router
