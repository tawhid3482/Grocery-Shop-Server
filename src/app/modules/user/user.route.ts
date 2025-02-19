import express from 'express'
import { userControllers } from './user.controller'
import validationRequest from '../../middlewares/validationRequest'
import { userValidation } from './user.validation'

const router = express.Router()

router.post('/users',validationRequest(userValidation.userValidationSchema), userControllers.createUser)
router.get('/users/:id', userControllers.getSingleUser)
router.get('/users', userControllers.getAllUser)

export const userRoutes = router
