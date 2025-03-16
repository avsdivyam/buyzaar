import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItem, removeFromCart } from '../redux/slices/cartSlice';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import '../styles/global.css';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalItems, totalAmount, loading, error } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.auth);
  
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItem({ itemId, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(itemId));
    }
  };
  
  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };
  
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1>Your Cart</h1>
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1>Your Cart</h1>
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart-page">
      <Navbar />
      <div className="container">
        <h1>Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link to="/products">
              <Button variant="primary">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">${item.price}</p>
                  </div>
                  
                  <div className="item-quantity">
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button 
                    className="remove-item"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Items ({totalItems}):</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>$0.00</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              
              <div className="checkout-actions">
                <Link to="/products">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
                
                {isAuthenticated ? (
                  <Link to="/checkout">
                    <Button variant="primary">Proceed to Checkout</Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button variant="primary">Login to Checkout</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;