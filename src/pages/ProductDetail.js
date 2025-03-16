import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import '../styles/global.css';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, loading, error } = useSelector(state => state.products);
  
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);
  
  const handleAddToCart = () => {
    if (currentProduct) {
      dispatch(addToCart({
        productId: currentProduct.id,
        quantity: 1
      }));
    }
  };
  
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }
  
  if (!currentProduct) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <p>Product not found</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="product-detail-page">
      <Navbar />
      <div className="container">
        <div className="product-detail">
          <div className="product-image-container">
            <img 
              src={currentProduct.image} 
              alt={currentProduct.name} 
              className="product-detail-image" 
            />
          </div>
          
          <div className="product-info">
            <h1 className="product-title">{currentProduct.name}</h1>
            <p className="product-price">${currentProduct.price}</p>
            
            <div className="product-description">
              <h3>Description</h3>
              <p>{currentProduct.description}</p>
            </div>
            
            <div className="product-meta">
              <p><strong>Category:</strong> {currentProduct.category}</p>
              <p><strong>In Stock:</strong> {currentProduct.inStock ? 'Yes' : 'No'}</p>
              {currentProduct.rating && (
                <p><strong>Rating:</strong> {currentProduct.rating}/5</p>
              )}
            </div>
            
            <div className="product-actions">
              <Button 
                onClick={handleAddToCart} 
                variant="primary" 
                size="large"
                disabled={!currentProduct.inStock}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        
        <div className="product-reviews">
          <h2>Customer Reviews</h2>
          {currentProduct.reviews && currentProduct.reviews.length > 0 ? (
            <div className="reviews-list">
              {currentProduct.reviews.map(review => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <span className="review-author">{review.author}</span>
                    <span className="review-rating">{review.rating}/5</span>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <p className="review-content">{review.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;