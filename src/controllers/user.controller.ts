import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import { createUser } from '../service/user.service';
import { CreateUserInput } from '../schema/user.schema';
import User, { IUser } from '../models/user.model';
import { DocumentDefinition } from 'mongoose';

export const registerUser = async (
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.create(parseRegisterInput(req.body));

    return res.status(201).json({ user });
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
