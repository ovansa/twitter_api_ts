import { DocumentDefinition } from 'mongoose';
import User, { IUser } from '../models/user.model';
import logger from '../utils/logger';

export const createUser = async (
  input: DocumentDefinition<
    Omit<IUser, 'createdAt' | 'updatedAt' | 'matchPasswords'>
  >
) => {
  try {
    return await User.create(input);
  } catch (err: any) {
    throw new Error(err);
  }
};
