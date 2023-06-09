import express from 'express';
import { protect } from '../controllers/authControllers';
import { getAllArticle } from '../controllers/articleControllers';

const router = express.Router();

router.route('/').get(protect, getAllArticle);

export default router;
