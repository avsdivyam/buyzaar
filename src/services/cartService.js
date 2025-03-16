import api from './api';

export const cartService = {
  getCart: () => {
    return api.get('/cart');
  },
  
  addItem: (productData) => {
    return api.post('/cart/items', productData);
  },
  
  updateItem: (itemId, quantity) => {
    return api.put(`/cart/items/${itemId}`, { quantity });
  },
  
  removeItem: (itemId) => {
    return api.delete(`/cart/items/${itemId}`);
  },
  
  clearCart: () => {
    return api.delete('/cart');
  },
  
  applyCoupon: (couponCode) => {
    return api.post('/cart/coupon', { code: couponCode });
  },
  
  removeCoupon: () => {
    return api.delete('/cart/coupon');
  }
};

export default cartService;