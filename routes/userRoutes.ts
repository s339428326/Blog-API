import express from 'express';

import { singUp, login } from '../controllers/authControllers';
import { updatePassword, protect } from '../controllers/authControllers';

const router = express.Router();

//auth
router.post('/singup', singUp);
router.post('/login', login);

router.post('/updatePassword', protect, updatePassword);

export default router;
