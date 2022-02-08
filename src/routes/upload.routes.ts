import express from 'express';
import multer from 'multer';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import { uploadFile } from '../controllers/upload.controller';

const router = express.Router();

const uploadSimple = multer().single('image');

var s3 = new aws.S3({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_ID,
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: `${process.env.AWS_BUCKET_NAME}`,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

router.post('/', upload.single('file'), uploadFile);

export default router;

// https://medium.com/@masnun/nodejs-uploading-file-to-s3-cbf74c2ec984
// https://www.codegrepper.com/code-examples/whatever/aws+upload+file+to+s3+typescript
