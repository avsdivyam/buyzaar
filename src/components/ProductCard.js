import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price}</p>
      <div className="product-actions">
        <Link to={`/products/${product.id}`} className="view-button">View Details</Link>
        <button className="add-to-cart-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;