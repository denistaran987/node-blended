import { ProductsCollection } from '../db/models/Product.js';
export const getAllProducts = () => ProductsCollection.find();
