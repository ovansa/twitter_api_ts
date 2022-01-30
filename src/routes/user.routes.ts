import express from 'express';
import { loginUser, registerUser } from '../controllers/user.controller';
import validateResource from '../middleware/validateResource';
import { createUserSchema, loginUserSchema } from '../schema/user.schema';

const router = express.Router();

router.post('/login', validateResource(loginUserSchema), loginUser);
router.post('/register', validateResource(createUserSchema), registerUser);

export default router;
