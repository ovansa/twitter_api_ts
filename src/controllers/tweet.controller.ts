import { NextFunction, Request, Response } from 'express';
import Tweet from '../models/tweet.model';
import { IAuthInfoRequest } from '../utils/definitions';
import logger from '../utils/logger';

// @desc    Add tweet
// @route   POST /api/tweet/add
// @access  Private
export const addTweet = async (
  req: IAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const tweet = await Tweet.create({ author_id: req.user._id, ...req.body });
    return res.status(201).json({
      success: true,
      tweet,
    });
  } catch (err) {
    next(err);
  }
};
