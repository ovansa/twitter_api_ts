import express from 'express';
import { registerUser } from '../controllers/user.controller';
import validateResource from '../middleware/validateResource';
import { createUserSchema } from '../schema/user.schema';

const router = express.Router();

router.post('/', validateResource(createUserSchema), registerUser);

export default router;
