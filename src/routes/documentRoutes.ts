import express from 'express';
import { extractDocumentData } from '../controllers/documentController';
import { upload } from '../config/multerConfig';

const router = express.Router();

router.post('/extract', upload.single('document'), extractDocumentData);

export default router;
