import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedProducts } from '../redux/slices/productSlice';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import '../styles/global.css';

const Home = () => {
  const dispatch = useDispatch();
  const { featuredProducts, loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  return (
    <div className="home-page">
      <Navbar />
      <div className="hero-section">
        <h1>Welcome to BuyZaar</h1>
        <p>Your one-stop shop for all your needs</p>
      </div>
      
      <div className="featured-products">
        <h2>Featured Products</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="product-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      
      <div className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {/* Categories will be displayed here */}
        </div>
      </div>
    </div>
  );
};

export default Home;