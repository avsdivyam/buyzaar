import api from './api';

export const productService = {
  getProducts: (filters = {}) => {
    return api.get('/products', { params: filters });
  },
  
  getProductById: (productId) => {
    return api.get(`/products/${productId}`);
  },
  
  getFeaturedProducts: () => {
    return api.get('/products/featured');
  },
  
  searchProducts: (query) => {
    return api.get('/products/search', { params: { q: query } });
  },
  
  getProductsByCategory: (categoryId) => {
    return api.get(`/categories/${categoryId}/products`);
  },
  
  getProductReviews: (productId) => {
    return api.get(`/products/${productId}/reviews`);
  },
  
  addProductReview: (productId, reviewData) => {
    return api.post(`/products/${productId}/reviews`, reviewData);
  }
};

export default productService;