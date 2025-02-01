import { Router } from 'express';
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from '../controllers/products.js';
import {
  createProductSchema,
  updateProductSchema,
} from '../validation/products.js';
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
router.patch(
  '/:productId',
  isValidId,
  validateBody(updateProductSchema),
  ctrlWrapper(updateProductController),
);

export default router;
