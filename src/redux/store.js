import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/login'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.keycloak'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.keycloak'],
      },
    }),
});

export default store;