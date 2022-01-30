import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import config from 'config';
import connectDB from '../config/db';
import logger from './utils/logger';
import errorResponse from './middleware/error';

import healthCheck from './routes/healthcheck.routes';
import users from './routes/user.routes';

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 4500;

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

app.use('/', healthCheck);
app.use('/api/users', users);

app.use(errorResponse);

app.listen(port, async () => {
  logger.info(`Server running on http://localhost:${port}`);
});
