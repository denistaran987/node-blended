import {
  createProduct,
  getAllProducts,
  getProductById,
} from '../services/products.js';

export const getAllProductsController = async (req, res) => {
  const products = await getAllProducts();
  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};
export const getProductByIdController = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await getProductById(productId);
    if (!product) {
      res.status(404).json({
        message: 'Product not found',
      });
      return;
    }

    res.json({
      status: 200,
      message: `Successfully found product with id ${productId}!`,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
export const createProductController = async (req, res) => {
  const createdProduct = await createProduct(req.body);
  res.json(201, {
    status: 201,
    message: 'Successfully created a product!',
    data: createdProduct,
  });
};
