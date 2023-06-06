import express from 'express';

import { singUp, login, protect } from '../controllers/authControllers';

const router = express.Router();

//auth
router.post('/singup', singUp);
router.post('/login', login);

export default router;
