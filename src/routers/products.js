import { Router } from 'express';
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
} from '../controllers/products.js';
import { createProductSchema } from '../validation/products.js';
import { validateBody } from '../utils/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
router.get('/', ctrlWrapper(getAllProductsController));
router.get('/:productId', isValidId, ctrlWrapper(getProductByIdController));
router.post(
  '/',
  validateBody(createProductSchema),
  ctrlWrapper(createProductController),
);

export default router;
