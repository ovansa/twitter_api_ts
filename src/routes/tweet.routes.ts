import express from 'express';
import { addTweet } from '../controllers/tweet.controller';
import requireUser from '../middleware/auth';
import validateResource from '../middleware/validateResource';
import { addTweetSchema } from '../schema/tweet.schema';

const router = express.Router();

router.post('/add', requireUser, validateResource(addTweetSchema), addTweet);

export default router;
