import { ProductsCollection } from '../db/models/Product.js';
export const getAllProducts = () => ProductsCollection.find();
export const getProductById = (productId) =>
  ProductsCollection.findById(productId);

// export const getProductById = (productId) =>
//   ProductsCollection.findOne({ _id: productId });
