import express from 'express';
import { uploadFile } from '../controllers/upload.controller';

const router = express.Router();

router.post('/', uploadFile);

export default router;

// https://medium.com/@masnun/nodejs-uploading-file-to-s3-cbf74c2ec984
// https://www.codegrepper.com/code-examples/whatever/aws+upload+file+to+s3+typescript
