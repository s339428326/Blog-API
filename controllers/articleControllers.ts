import Article, { IArticle } from '../models/articleModel';

import {
  createHandler,
  readHandler,
  readAllHandler,
  updateHandler,
  deleteHandler,
} from './handlerFactory';

export const createArticle = createHandler(Article);
export const getAllArticle = readAllHandler(Article);
export const getOneArticle = readHandler(Article);
export const updateArticle = updateHandler(Article);
export const deleteArticle = deleteHandler(Article);
