import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import { CreateUserInput } from '../schema/user.schema';
import User, { IUser } from '../models/user.model';
import { DocumentDefinition } from 'mongoose';
import { omit } from 'lodash';

export const registerUser = async (
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.create(parseRegisterInput(req.body));

    sendTokenResponse(user, 201, res);
  } catch (err: any) {
    logger.error(err);
    next(err);
  }
};

export const parseRegisterInput = (
  input: DocumentDefinition<
    Omit<IUser, 'createdAt' | 'updatedAt' | 'matchPasswords'>
  >
) => {
  return input;
};

export const sendTokenResponse = (
  user: InstanceType<typeof User>,
  statusCode: number,
  res: Response
) => {
  const token = user.getSignedJwtToken();
  const cookie_expire = process.env.JWT_COOKIE_EXPIRE as any as number;
  const sanitizedUser = omit(user.toJSON(), 'password');
  logger.info(`COOKIE EXPIRE: ${cookie_expire}`);

  const options = {
    expires: new Date(Date.now() + cookie_expire * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  return res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token, user: sanitizedUser });
};
