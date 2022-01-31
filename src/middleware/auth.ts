import { NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import { omit } from 'lodash';
import User from '../models/user.model';
import { IAuthInfoRequest } from '../utils/definitions';
import ErrorResponse from '../utils/errorResponse';

const requireUser = async (
  req: IAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized', 401));
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as any;

    const user = await User.findById(decoded.id);
    req.user = omit(user?.toJSON(), 'password');

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized', 401));
  }
};

export default requireUser;
