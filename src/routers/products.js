import { Router } from 'express';
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
} from '../controllers/products.js';
import { createProductSchema } from '../validation/products.js';
import { validateBody } from '../utils/validateBody.js';

const router = Router();
router.get('/', getAllProductsController);
router.get('/:productId', getProductByIdController);
router.post('/', validateBody(createProductSchema), createProductController);

export default router;
