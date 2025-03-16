import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import ProductList from './pages/ProductList.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Orders from './pages/Orders.jsx';
import NotFound from './pages/NotFound.jsx';

// Protected route wrapper
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const createRoutes = (isAuthenticated) => {
  return createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/products',
      element: <ProductList />,
    },
    {
      path: '/products/:id',
      element: <ProductDetail />,
    },
    {
      path: '/cart',
      element: <Cart />,
    },
    {
      path: '/checkout',
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Checkout />
        </ProtectedRoute>
      ),
    },
    {
      path: '/orders',
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <Orders />
        </ProtectedRoute>
      ),
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
};

export default createRoutes;