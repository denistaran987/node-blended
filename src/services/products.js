import { ProductsCollection } from '../db/models/Product.js';
export const getAllProducts = (filters) => {
  const productsQuery = ProductsCollection.find();

  if (filters.category) {
    productsQuery.where('category').equals(filters.category);
  }

  return ProductsCollection.find().merge(productsQuery).exec();
};
export const getProductById = (productId) =>
  ProductsCollection.findById(productId);

// export const getProductById = (productId) =>
//   ProductsCollection.findOne({ _id: productId });
export const createProduct = (productData) =>
  ProductsCollection.create(productData);
