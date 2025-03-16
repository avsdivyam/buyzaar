import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, Button, Badge } from 'react-bootstrap';
import { addToCart } from '../redux/slices/cartSlice';

// Placeholder image if product image is not available
const placeholderImage = 'https://via.placeholder.com/300x300?text=Product+Image';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: product.id,
      quantity: 1
    }));
  };

  // Generate random rating for demo purposes
  const rating = product.rating || Math.floor(Math.random() * 5) + 1;
  const reviewCount = product.reviewCount || Math.floor(Math.random() * 100) + 5;

  // Check if product has a discount
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Card className="h-100 product-card">
      {discountPercentage && (
        <div className="discount-badge">
          {discountPercentage}% OFF
        </div>
      )}

      <Card.Img
        variant="top"
        src={product.image || placeholderImage}
        alt={product.name}
        className="card-img-top"
      />

      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`bi ${i < rating ? 'bi-star-fill' : 'bi-star'}`}
              ></i>
            ))}
            <span className="rating-count">({reviewCount})</span>
          </div>
        </div>

        <Card.Title className="card-title">{product.name}</Card.Title>

        <div className="mb-3 d-flex align-items-center">
          <span className="price">${product.price?.toFixed(2) || '29.99'}</span>
          {hasDiscount && (
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="mt-auto d-flex gap-2">
          <Button
            as={Link}
            to={`/products/${product.id}`}
            variant="outline-primary"
            className="flex-grow-1"
          >
            View Details
          </Button>
          <Button
            variant="primary"
            className="flex-grow-1"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;