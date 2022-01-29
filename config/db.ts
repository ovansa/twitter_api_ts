import mongoose from 'mongoose';
import config from 'config';
import logger from '../src/utils/logger';

const connectDB = async () => {
  const dbUri = config.get<string>('dbUri');

  try {
    const conn = await mongoose.connect(dbUri);
    logger.info(`DB Connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error(`Could not connect to DB: ${err}`);
    process.exit(1);
  }
};

export default connectDB;
