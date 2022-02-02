import multer from 'multer';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_ID,
});

const s3 = new aws.S3();

const imageFilter = (req: any, file: any, cb: any) => {
  if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

export const upload = multer({
  fileFilter: imageFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: `${process.env.AWS_BUCKET_NAME}`,
    cacheControl: 'max-age=31536000',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}.jpg`);
    },
  }),
}).single('file');

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`File ${req.file}`);
  next();
};
