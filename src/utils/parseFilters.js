import { CATEGORIES } from '../constants/index.js';
const parseCategory = (category) => {
  if (CATEGORIES.includes(category)) {
    return category;
  }
};
export const parseFilters = (query) => {
  return { category: parseCategory(query.category) };
};
