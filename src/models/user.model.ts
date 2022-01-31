import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';

export interface IUser extends mongoose.Document {
  email: string;
  username: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  matchPasswords(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  let user = this as IUser;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.getSignedJwtToken = function () {
  const secret = process.env.JWT_SECRET as string;
  return jwt.sign({ id: this._id }, secret, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.matchPasswords = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as unknown as IUser;

  return await bcrypt
    .compare(candidatePassword, user.password)
    .catch((e) => false);
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
