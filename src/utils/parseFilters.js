import { CATEGORIES } from '../constants/index.js';

const parseCategory = (category) => {
  if (CATEGORIES.includes(category)) {
    return category;
  }
};

const parseInteger = (price) => {
  const number = Number.parseInt(price);

  if (Number.isNaN(number)) {
    return;
  }
  return number;
};

export const parseFilters = (query) => {
  return {
    category: parseCategory(query.category),
    minPrice: parseInteger(query.minPrice),
    maxPrice: parseInteger(query.maxPrice),
  };
};
