import express from 'express';
import cors from 'cors';

import { env } from './utils/env.js';
import { getAllProducts, getProductById } from './services/products.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/products', async (req, res) => {
    const products = await getAllProducts();
    res.json({
      status: 200,
      message: 'Successfully found products!',
      data: products,
    });
  });

  app.get('/products/:productId', async (req, res, next) => {
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
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Route not found',
    });
  });

  app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).json({
      message: 'Internal server error',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
