import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'
import { TUser_role } from '../modules/user/user.interface'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { User } from '../modules/user/user.model'
const auth = (...requiredRoles: TUser_role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
    }

    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload

    const { userEmail, role, iat } = decoded

    const userData = await User.isUserExistByEmail(userEmail)
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

    if(userData.passwordChangeAt && User.isJWTIssuedBeforePasswordChanged(userData.passwordChangeAt, iat as number)){
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');

    }
    

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
    }

    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
