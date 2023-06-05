import express from 'express';

import { singUp } from '../controllers/authControllers';

const router = express.Router();

//auth
router.post('/singup', singUp);

export default router;
