import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fileupload from 'express-fileupload';
import config from 'config';
import connectDB from '../config/db';
import logger from './utils/logger';
import errorResponse from './middleware/error';

import healthCheck from './routes/healthcheck.routes';
import users from './routes/user.routes';
import tweets from './routes/tweet.routes';
import uploads from './routes/upload.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 4500;

app.use(express.json());
app.use(fileupload());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

app.use('/', healthCheck);
app.use('/api/users', users);
app.use('/api/tweets', tweets);
app.use('/api/uploads', uploads);

app.use(errorResponse);

connectDB();

const server = app.listen(port, async () => {
  logger.info(`Server running on http://localhost:${port}`);
});

process.on('unhandledRejection', (err: Error, promise) => {
  logger.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
