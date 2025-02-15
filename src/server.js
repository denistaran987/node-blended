import express from 'express';
import cors from 'cors';
import { env } from './utils/env.js';
import productsRouter from './routers/products.js';
import { errorHandler } from './middlewares/errorHandler.js';
import usersRouter from './routers/users.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use('/users', usersRouter);
  app.use('/products', productsRouter);
  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Route not found',
    });
  });

  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
