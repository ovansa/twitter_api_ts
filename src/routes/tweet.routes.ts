import express from 'express';
import {
  addTweet,
  deleteTweet,
  getAllTweets,
  getAllTweetsCreatedBySelf,
} from '../controllers/tweet.controller';
import requireUser from '../middleware/auth';
import validateResource from '../middleware/validateResource';
import { addTweetSchema } from '../schema/tweet.schema';

const router = express.Router();

router.post('/', requireUser, validateResource(addTweetSchema), addTweet);
router.get('/', requireUser, getAllTweets);
router.get('/self', requireUser, getAllTweetsCreatedBySelf);
router.delete('/:id', requireUser, deleteTweet);

export default router;
