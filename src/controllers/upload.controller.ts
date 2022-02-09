import { NextFunction, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new AWS.S3({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_ID,
});

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  let myFiles = Object.values(req.files as object);
  const firstFile = myFiles[0];
  let myFile = firstFile.name.split('.');
  const fileType = myFile[myFile.length - 1];

  const fileContent = fs.readFileSync(firstFile.tempFilePath);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: `${uuid()}.${fileType}`,
    Body: fileContent,
  };

  try {
    s3.upload(params, (err: any, data: any) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res
        .status(200)
        .json({ message: 'File uploaded', file_url: data.Location });
    });
  } catch (err) {
    next(err);
  }
};
