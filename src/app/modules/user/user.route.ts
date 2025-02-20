import express from 'express'
import { userControllers } from './user.controller'
import validationRequest from '../../middlewares/validationRequest'
import { userValidation } from './user.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constant'

const router = express.Router()

router.post('/users',validationRequest(userValidation.userValidationSchema), userControllers.createUser)
router.post('/admin',validationRequest(userValidation.userValidationSchema), userControllers.createAdmin)
router.get('/users/:id', userControllers.getSingleUser)
router.get('/users',auth(USER_ROLE.admin), userControllers.getAllUser)

export const userRoutes = router
