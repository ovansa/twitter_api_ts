import express from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/upload.controller';

const router = express.Router();

const uploadSimple = multer().single('image');

router.post('/', uploadSimple, uploadFile);

export default router;

// https://medium.com/@masnun/nodejs-uploading-file-to-s3-cbf74c2ec984
// https://www.codegrepper.com/code-examples/whatever/aws+upload+file+to+s3+typescript
