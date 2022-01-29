import express from 'express';
import config from 'config';
import connectDB from '../config/db';
import logger from './utils/logger';
import errorResponse from './middleware/error';

import healthCheck from './routes/healthcheck.routes';
import users from './routes/user.routes';

const app = express();
const port = config.get<number>('port');

app.use(express.json());

app.use('/', healthCheck);
app.use('/api/users', users);

app.use(errorResponse);

app.listen(port, async () => {
  logger.info(`Server running on http://localhost:${port}`);
  await connectDB();
});
