import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import '../styles/global.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.products);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'newest'
  });

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="product-list-page">
      <Navbar />
      <div className="product-list-container">
        <div className="filters-sidebar">
          <h2>Filters</h2>
          <div className="filter-group">
            <label htmlFor="category">Category</label>
            <select 
              id="category" 
              name="category" 
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home & Kitchen</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="minPrice">Min Price</label>
            <input 
              type="number" 
              id="minPrice" 
              name="minPrice" 
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="maxPrice">Max Price</label>
            <input 
              type="number" 
              id="maxPrice" 
              name="maxPrice" 
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="sortBy">Sort By</label>
            <select 
              id="sortBy" 
              name="sortBy" 
              value={filters.sortBy}
              onChange={handleFilterChange}
            >
              <option value="newest">Newest</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
        
        <div className="products-grid-container">
          <h1>All Products</h1>
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="product-grid">
              {products.length > 0 ? (
                products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p>No products found matching your criteria.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;