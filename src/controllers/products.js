import createHttpError from 'http-errors';
import {
  createProduct,
  getAllProducts,
  getProductById,
} from '../services/products.js';
import { parseFilters } from '../utils/parseFilters.js';

export const getAllProductsController = async (req, res) => {
  const filters = parseFilters(req.query);
  const products = await getAllProducts(filters);
  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};
export const getProductByIdController = async (req, res) => {
  const { productId } = req.params;

  const product = await getProductById(productId);
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};

export const createProductController = async (req, res) => {
  const createdProduct = await createProduct(req.body);
  res.json(201, {
    status: 201,
    message: 'Successfully created a product!',
    data: createdProduct,
  });
};
