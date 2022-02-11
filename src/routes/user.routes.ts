import express from 'express';
import {
  loginUser,
  registerUser,
  updatePassword,
  updateUserDetails,
} from '../controllers/user.controller';
import requireUser from '../middleware/auth';
import validateResource from '../middleware/validateResource';
import {
  createUserSchema,
  loginUserSchema,
  updatePasswordSchema,
  updateUserSchema,
} from '../schema/user.schema';

const router = express.Router();

router.post('/login', validateResource(loginUserSchema), loginUser);
router.post('/register', validateResource(createUserSchema), registerUser);
router.put(
  '/updatepassword',
  requireUser,
  validateResource(updatePasswordSchema),
  updatePassword
);
router.put(
  '/update',
  requireUser,
  validateResource(updateUserSchema),
  updateUserDetails
);

export default router;
