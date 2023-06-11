import express from 'express';
import { protect } from '../controllers/authControllers';
import {
  getAllArticle,
  getOneArticle,
  updateArticle,
  deleteArticle,
  createArticle,
} from '../controllers/articleControllers';

const router = express.Router();

router.use(protect);

router.route('/').get(getAllArticle).post(createArticle);

router
  .route('/:id')
  .get(getOneArticle)
  .patch(updateArticle)
  .delete(deleteArticle);

export default router;
