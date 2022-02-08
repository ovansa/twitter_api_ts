import multer from 'multer';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import AWS from 'aws-sdk';

// aws.config.update({
//   secretAccessKey: process.env.AWS_SECRET,
//   accessKeyId: process.env.AWS_ID,
// });

// const s3 = new aws.S3({
//   secretAccessKey: process.env.AWS_SECRET,
//   accessKeyId: process.env.AWS_ID,
// });

// const imageFilter = (req: any, file: any, cb: any) => {
//   if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
//     return cb(new Error('Only image files are allowed!'), false);
//   }
//   cb(null, true);
// };

// export const upload = multer({
//   fileFilter: imageFilter,
//   storage: multerS3({
//     acl: 'public-read',
//     s3,
//     bucket: `${process.env.AWS_BUCKET_NAME}`,
//     cacheControl: 'max-age=31536000',
//     metadata: (req, file, cb) => {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: (req, file, cb) => {
//       cb(null, `${Date.now().toString()}.jpg`);
//     },
//   }),
// }).single('file');

// const storage = multer();
// const uploadSimple = multer().single('image');
// const s3Client = new S3Client({ region: process.env.AWS_S3_REGION });
// export function uploadFiles(file, fileKey) {
//   s3Client.send(
//     new PutObjectCommand({
//       Bucket: process.env.MY_AWS_S3_BUCKET,
//       Key: fileKey,
//       Body: file,
//     })
//   );
// }

const s3 = new AWS.S3({
  secretAccessKey: 'pAw1H6O3FA+Q1IfVBXVRwEceaS4r+KflVwKKcz+/',
  accessKeyId: 'AKIAT6YDIHBS33ZIOSXP',
});

console.log(`Bucket name: ${process.env.AWS_BUCKET_NAME}`);
export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  // upload(req, res, async (err) => {
  //   try {
  //     if (err) {
  //       return res.status(422).send({ errors: err.message });
  //     }

  //     const file = req.files;
  //     if (!file) {
  //       return res.status(400).json({ message: 'Please upload a file' });
  //     }

  //     return res.status(200).json({ message: 'File uploaded successfully' });
  //   } catch (err: any) {
  //     res.status(500).json({ message: err.message });
  //   }
  // });
  // console.log(req.files);
  // res.status(200).json({ message: 'File uploaded' });
  let myFiles = Object.values(req.files as object);
  const firstFile = myFiles[0];
  // const props = Object.keys(myFile)
  let myFile = firstFile.name.split('.');
  const fileType = myFile[myFile.length - 1];
  console.log(firstFile.data.buffer);

  const fileContent = fs.readFileSync(firstFile.tempFilePath);
  console.log(fileContent);

  const params = {
    Bucket: 'twitter-api-ts',
    Key: `${uuid()}.${fileType}`,
    Body: fileContent,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log(data.Location);
    return res.status(200).json({ message: 'File uploaded' });
  });
};
