import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button, Table, Form, InputGroup, Alert, Spinner, Badge } from 'react-bootstrap';
import { fetchCart, updateCartItem, removeFromCart } from '../redux/slices/cartSlice';
import Navbar from '../components/Navbar.jsx';

// Mock cart items
const mockCartItems = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    name: 'Smart Watch Series 5',
    price: 199.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }
];

const Cart = () => {
  const dispatch = useDispatch();
  const { items = [], totalItems = 0, totalAmount = 0, loading, error } = useSelector(state => state.cart || {});
  const { isAuthenticated = false } = useSelector(state => state.auth || {});
  const [isLoading, setIsLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Use mock data for demo
  const cartItems = mockCartItems;
  const cartTotalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = cartSubtotal > 100 ? 0 : 10;
  const discount = couponApplied ? cartSubtotal * 0.1 : 0;
  const cartTotal = cartSubtotal + shippingCost - discount;

  useEffect(() => {
    // Simulate API call
    dispatch(fetchCart());

    // Simulate loading state for demo
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      dispatch(updateCartItem({ itemId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleApplyCoupon = () => {
    if (!couponCode) {
      setCouponError('Please enter a coupon code');
      return;
    }

    // Simulate coupon validation
    if (couponCode.toUpperCase() === 'DISCOUNT10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setCouponApplied(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <Container className="py-5 mt-5">
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading your cart...</p>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <Container className="py-5 mt-5">
          <Alert variant="danger">
            Error: {error}
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      {/* Add margin-top to account for fixed navbar */}
      <div style={{ marginTop: '76px' }}></div>

      <Container className="py-5">
        <h1 className="mb-4">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="bi bi-cart-x text-muted" style={{ fontSize: '5rem' }}></i>
            </div>
            <h3 className="mb-3">Your cart is empty</h3>
            <p className="text-muted mb-4">Looks like you haven't added any products to your cart yet.</p>
            <Button
              as={Link}
              to="/products"
              variant="primary"
              size="lg"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <Row>
            <Col lg={8} className="mb-4">
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white py-3">
                  <h5 className="mb-0">Cart Items ({cartTotalItems})</h5>
                </Card.Header>
                <Card.Body className="p-0">
                  <Table responsive className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th className="py-3 ps-4">Product</th>
                        <th className="py-3 text-center">Price</th>
                        <th className="py-3 text-center">Quantity</th>
                        <th className="py-3 text-center">Total</th>
                        <th className="py-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map(item => (
                        <tr key={item.id}>
                          <td className="py-3 ps-4">
                            <div className="d-flex align-items-center">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="cart-item-image me-3"
                                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                              />
                              <div>
                                <h6 className="mb-1">{item.name}</h6>
                                <p className="text-muted small mb-0">SKU: PROD-{item.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-center align-middle">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="py-3 text-center align-middle">
                            <InputGroup size="sm" style={{ width: '120px', margin: '0 auto' }}>
                              <Button
                                variant="outline-secondary"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </Button>
                              <Form.Control
                                type="number"
                                min="1"
                                max="10"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                className="text-center"
                              />
                              <Button
                                variant="outline-secondary"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                disabled={item.quantity >= 10}
                              >
                                +
                              </Button>
                            </InputGroup>
                          </td>
                          <td className="py-3 text-center align-middle fw-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="py-3 text-center align-middle">
                            <Button
                              variant="link"
                              className="text-danger p-0"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
                <Card.Footer className="bg-white py-3">
                  <div className="d-flex justify-content-between">
                    <Button
                      as={Link}
                      to="/products"
                      variant="outline-primary"
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      Continue Shopping
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        // Clear cart functionality would go here
                        alert('Cart cleared functionality would go here');
                      }}
                    >
                      <i className="bi bi-x-circle me-2"></i>
                      Clear Cart
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="border-0 shadow-sm mb-4">
                <Card.Header className="bg-white py-3">
                  <h5 className="mb-0">Order Summary</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Subtotal:</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Shipping:</span>
                    {shippingCost === 0 ? (
                      <span className="text-success">Free</span>
                    ) : (
                      <span>${shippingCost.toFixed(2)}</span>
                    )}
                  </div>

                  {couponApplied && (
                    <div className="d-flex justify-content-between mb-3 text-success">
                      <span>Discount (10%):</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <hr />

                  <div className="d-flex justify-content-between mb-3 fw-bold">
                    <span>Total:</span>
                    <span className="text-primary fs-5">${cartTotal.toFixed(2)}</span>
                  </div>

                  {shippingCost === 0 && (
                    <div className="alert alert-success py-2 mb-3">
                      <small className="mb-0">
                        <i className="bi bi-truck me-2"></i>
                        Free shipping applied!
                      </small>
                    </div>
                  )}

                  {shippingCost > 0 && (
                    <div className="alert alert-info py-2 mb-3">
                      <small className="mb-0">
                        <i className="bi bi-info-circle me-2"></i>
                        Add ${(100 - cartSubtotal).toFixed(2)} more to get FREE shipping!
                      </small>
                    </div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="couponCode" className="form-label">Apply Coupon</label>
                    <div className="input-group">
                      <Form.Control
                        type="text"
                        id="couponCode"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        isInvalid={!!couponError}
                        isValid={couponApplied}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={handleApplyCoupon}
                      >
                        Apply
                      </Button>
                    </div>
                    {couponError && (
                      <Form.Text className="text-danger">
                        {couponError}
                      </Form.Text>
                    )}
                    {couponApplied && (
                      <Form.Text className="text-success">
                        Coupon applied successfully!
                      </Form.Text>
                    )}
                    <Form.Text className="text-muted d-block mt-2">
                      Try code: DISCOUNT10
                    </Form.Text>
                  </div>

                  <div className="d-grid gap-2">
                    {isAuthenticated ? (
                      <Button
                        as={Link}
                        to="/checkout"
                        variant="primary"
                        size="lg"
                      >
                        Proceed to Checkout
                      </Button>
                    ) : (
                      <Button
                        as={Link}
                        to="/login"
                        variant="primary"
                        size="lg"
                      >
                        Login to Checkout
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>

              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <h6 className="mb-3">We Accept</h6>
                  <div className="d-flex gap-2 mb-3">
                    <i className="bi bi-credit-card fs-3"></i>
                    <i className="bi bi-paypal fs-3"></i>
                    <i className="bi bi-apple fs-3"></i>
                    <i className="bi bi-google fs-3"></i>
                  </div>
                  <hr />
                  <h6 className="mb-3">Secure Checkout</h6>
                  <p className="text-muted small mb-0">
                    <i className="bi bi-shield-lock me-2"></i>
                    Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Cart;