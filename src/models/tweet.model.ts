import mongoose from 'mongoose';
import { IUser } from './user.model';

export interface ITweet extends mongoose.Document {
  text: string;
  author_id: IUser['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const tweetSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Tweet = mongoose.model<ITweet>('Tweet', tweetSchema);

export default Tweet;
