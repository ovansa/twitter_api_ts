import { NextFunction, Request, Response } from 'express';
import Tweet from '../models/tweet.model';
import { IAuthInfoRequest } from '../utils/definitions';
import ErrorResponse from '../utils/errorResponse';
import logger from '../utils/logger';

// @desc    Add tweet
// @route   POST /api/tweets
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

// @desc    Get all tweets
// @route   GET /api/tweets
// @access  Private
export const getAllTweets = async (
  req: IAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const tweets = await Tweet.find();
    return res.status(201).json({
      success: true,
      tweets,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all tweets
// @route   GET /api/tweets
// @access  Private
export const getAllTweetsCreatedBySelf = async (
  req: IAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const tweets = await Tweet.find({ author_id: req.user._id });
    return res.status(201).json({
      success: true,
      tweets,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a tweet
// @route   GET /api/tweets
// @access  Private
export const deleteTweet = async (
  req: IAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return next(new ErrorResponse('Tweet not found', 404));
    }

    if (tweet.author_id.toString() !== req.user._id.toString()) {
      return next(
        new ErrorResponse('Not authorized to tweet not created by self', 401)
      );
    }

    await Tweet.findByIdAndDelete(tweetId);

    return res.status(200).json({
      success: true,
      message: 'Tweet deleted',
    });
  } catch (err) {
    next(err);
  }
};
