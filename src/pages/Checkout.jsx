import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert, Breadcrumb, ProgressBar, InputGroup, Tab, Tabs } from 'react-bootstrap';
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

const Checkout = () => {
  const navigate = useNavigate();
  const { items = [], totalAmount = 0 } = useSelector(state => state.cart || {});
  const { isAuthenticated = true } = useSelector(state => state.auth || { isAuthenticated: true });

  // Use mock data for demo
  const cartItems = mockCartItems;
  const cartSubtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = 0;
  const taxRate = 0.1;
  const taxAmount = cartSubtotal * taxRate;
  const orderTotal = cartSubtotal + shippingCost + taxAmount;

  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    saveInfo: true
  });

  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });

  const [validated, setValidated] = useState(false);
  const [paymentValidated, setPaymentValidated] = useState(false);

  useEffect(() => {
    // Redirect if cart is empty
    if (cartItems.length === 0) {
      navigate('/cart');
    }

    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }

    // Pre-fill with mock data for demo
    setShippingInfo({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      address: '123 Main St',
      apartment: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US',
      saveInfo: true
    });
  }, [navigate, isAuthenticated]);

  const handleShippingInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePaymentInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setActiveStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setPaymentValidated(true);
      return;
    }

    setPaymentValidated(true);
    setActiveStep(3);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = () => {
    setIsLoading(true);

    // Simulate API call to place order
    setTimeout(() => {
      setIsLoading(false);
      setOrderPlaced(true);
      setOrderId('ORD-' + Math.floor(100000 + Math.random() * 900000));
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div>
        <Navbar />

        {/* Add margin-top to account for fixed navbar */}
        <div style={{ marginTop: '76px' }}></div>

        <Container className="py-5">
          <div className="text-center py-5">
            <div className="mb-4">
              <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-4">
                <i className="bi bi-check-circle-fill text-success fs-1"></i>
              </div>
            </div>
            <h1 className="mb-3">Order Placed Successfully!</h1>
            <p className="text-muted mb-4">
              Thank you for your purchase. Your order has been placed and is being processed.
            </p>
            <div className="mb-4">
              <h5>Order Number: {orderId}</h5>
              <p className="text-muted">
                A confirmation email has been sent to {shippingInfo.email}
              </p>
            </div>
            <div className="d-flex justify-content-center gap-3">
              <Button
                as={Link}
                to="/orders"
                variant="primary"
                size="lg"
              >
                View Order
              </Button>
              <Button
                as={Link}
                to="/"
                variant="outline-primary"
                size="lg"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
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
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item as={Link} to="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item as={Link} to="/cart">Cart</Breadcrumb.Item>
          <Breadcrumb.Item active>Checkout</Breadcrumb.Item>
        </Breadcrumb>

        <h1 className="mb-4">Checkout</h1>

        {/* Checkout Progress */}
        <div className="mb-5">
          <Row className="checkout-steps mb-3">
            <Col xs={4} className="text-center">
              <div className={`step-circle mx-auto ${activeStep >= 1 ? 'active' : ''}`}>
                <span>1</span>
              </div>
              <p className="mt-2 mb-0 small">Shipping</p>
            </Col>
            <Col xs={4} className="text-center">
              <div className={`step-circle mx-auto ${activeStep >= 2 ? 'active' : ''}`}>
                <span>2</span>
              </div>
              <p className="mt-2 mb-0 small">Payment</p>
            </Col>
            <Col xs={4} className="text-center">
              <div className={`step-circle mx-auto ${activeStep >= 3 ? 'active' : ''}`}>
                <span>3</span>
              </div>
              <p className="mt-2 mb-0 small">Review</p>
            </Col>
          </Row>
          <ProgressBar now={(activeStep / 3) * 100} variant="primary" className="mb-4" />
        </div>

        <Row>
          <Col lg={8} className="mb-4">
            {/* Step 1: Shipping Information */}
            {activeStep === 1 && (
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white py-3">
                  <h5 className="mb-0">Shipping Information</h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <Form noValidate validated={validated} onSubmit={handleShippingSubmit}>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group controlId="firstName">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={shippingInfo.firstName}
                            onChange={handleShippingInfoChange}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            First name is required.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="lastName">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={shippingInfo.lastName}
                            onChange={handleShippingInfoChange}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Last name is required.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group controlId="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={shippingInfo.email}
                            onChange={handleShippingInfoChange}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Please enter a valid email address.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="phone">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={shippingInfo.phone}
                            onChange={handleShippingInfoChange}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Phone number is required.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="address">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingInfoChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Address is required.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="apartment">
                      <Form.Label>Apartment, suite, etc. (optional)</Form.Label>
                      <Form.Control
                        type="text"
                        name="apartment"
                        value={shippingInfo.apartment}
                        onChange={handleShippingInfoChange}
                      />
                    </Form.Group>

                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group controlId="city">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            value={shippingInfo.city}
                            onChange={handleShippingInfoChange}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            City is required.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="state">
                          <Form.Label>State</Form.Label>
                          <Form.Control
                            type="text"
                            name="state"
                            value={shippingInfo.state}
                            onChange={handleShippingInfoChange}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            State is required.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="zipCode">
                          <Form.Label>Zip Code</Form.Label>
                          <Form.Control
                            type="text"
                            name="zipCode"
                            value={shippingInfo.zipCode}
                            onChange={handleShippingInfoChange}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Zip code is required.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="country">
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleShippingInfoChange}
                        required
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please select a country.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="saveInfo">
                      <Form.Check
                        type="checkbox"
                        name="saveInfo"
                        label="Save this information for next time"
                        checked={shippingInfo.saveInfo}
                        onChange={handleShippingInfoChange}
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                      <Button
                        as={Link}
                        to="/cart"
                        variant="outline-secondary"
                      >
                        Back to Cart
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {activeStep === 2 && (
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white py-3">
                  <h5 className="mb-0">Payment Information</h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <Form noValidate validated={paymentValidated} onSubmit={handlePaymentSubmit}>
                    <Form.Group className="mb-4" controlId="paymentMethod">
                      <Form.Label>Payment Method</Form.Label>
                      <div>
                        <Form.Check
                          type="radio"
                          id="credit_card"
                          name="paymentMethod"
                          value="credit_card"
                          label={
                            <div className="d-flex align-items-center">
                              <i className="bi bi-credit-card me-2"></i>
                              Credit / Debit Card
                            </div>
                          }
                          checked={paymentInfo.paymentMethod === 'credit_card'}
                          onChange={handlePaymentInfoChange}
                          className="mb-2"
                        />
                        <Form.Check
                          type="radio"
                          id="paypal"
                          name="paymentMethod"
                          value="paypal"
                          label={
                            <div className="d-flex align-items-center">
                              <i className="bi bi-paypal me-2"></i>
                              PayPal
                            </div>
                          }
                          checked={paymentInfo.paymentMethod === 'paypal'}
                          onChange={handlePaymentInfoChange}
                          className="mb-2"
                        />
                        <Form.Check
                          type="radio"
                          id="apple_pay"
                          name="paymentMethod"
                          value="apple_pay"
                          label={
                            <div className="d-flex align-items-center">
                              <i className="bi bi-apple me-2"></i>
                              Apple Pay
                            </div>
                          }
                          checked={paymentInfo.paymentMethod === 'apple_pay'}
                          onChange={handlePaymentInfoChange}
                        />
                      </div>
                    </Form.Group>

                    {paymentInfo.paymentMethod === 'credit_card' && (
                      <>
                        <Form.Group className="mb-3" controlId="cardNumber">
                          <Form.Label>Card Number</Form.Label>
                          <Form.Control
                            type="text"
                            name="cardNumber"
                            value={paymentInfo.cardNumber}
                            onChange={handlePaymentInfoChange}
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Card number is required.
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="cardName">
                          <Form.Label>Name on Card</Form.Label>
                          <Form.Control
                            type="text"
                            name="cardName"
                            value={paymentInfo.cardName}
                            onChange={handlePaymentInfoChange}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Name on card is required.
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Row className="mb-3">
                          <Col md={6}>
                            <Form.Group controlId="expiryDate">
                              <Form.Label>Expiry Date</Form.Label>
                              <Form.Control
                                type="text"
                                name="expiryDate"
                                value={paymentInfo.expiryDate}
                                onChange={handlePaymentInfoChange}
                                placeholder="MM/YY"
                                required
                              />
                              <Form.Control.Feedback type="invalid">
                                Expiry date is required.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group controlId="cvv">
                              <Form.Label>CVV</Form.Label>
                              <Form.Control
                                type="text"
                                name="cvv"
                                value={paymentInfo.cvv}
                                onChange={handlePaymentInfoChange}
                                placeholder="123"
                                required
                              />
                              <Form.Control.Feedback type="invalid">
                                CVV is required.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="saveCard">
                          <Form.Check
                            type="checkbox"
                            name="saveCard"
                            label="Save this card for future purchases"
                            checked={paymentInfo.saveCard}
                            onChange={handlePaymentInfoChange}
                          />
                        </Form.Group>
                      </>
                    )}

                    <div className="d-flex justify-content-between">
                      <Button
                        variant="outline-secondary"
                        onClick={() => setActiveStep(1)}
                      >
                        Back to Shipping
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                      >
                        Review Order
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            )}

            {/* Step 3: Review Order */}
            {activeStep === 3 && (
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white py-3">
                  <h5 className="mb-0">Review Your Order</h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <div className="mb-4">
                    <h6 className="mb-3">Shipping Information</h6>
                    <p className="mb-1">
                      <strong>{shippingInfo.firstName} {shippingInfo.lastName}</strong>
                    </p>
                    <p className="mb-1">{shippingInfo.address}</p>
                    {shippingInfo.apartment && <p className="mb-1">{shippingInfo.apartment}</p>}
                    <p className="mb-1">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                    <p className="mb-1">{shippingInfo.country === 'US' ? 'United States' : shippingInfo.country}</p>
                    <p className="mb-1">{shippingInfo.phone}</p>
                    <p className="mb-0">{shippingInfo.email}</p>
                    <Button
                      variant="link"
                      className="p-0 mt-2"
                      onClick={() => setActiveStep(1)}
                    >
                      Edit
                    </Button>
                  </div>

                  <hr />

                  <div className="mb-4">
                    <h6 className="mb-3">Payment Information</h6>
                    {paymentInfo.paymentMethod === 'credit_card' && (
                      <>
                        <p className="mb-1">
                          <i className="bi bi-credit-card me-2"></i>
                          Credit Card ending in {paymentInfo.cardNumber.slice(-4)}
                        </p>
                        <p className="mb-0">{paymentInfo.cardName}</p>
                      </>
                    )}
                    {paymentInfo.paymentMethod === 'paypal' && (
                      <p className="mb-0">
                        <i className="bi bi-paypal me-2"></i>
                        PayPal
                      </p>
                    )}
                    {paymentInfo.paymentMethod === 'apple_pay' && (
                      <p className="mb-0">
                        <i className="bi bi-apple me-2"></i>
                        Apple Pay
                      </p>
                    )}
                    <Button
                      variant="link"
                      className="p-0 mt-2"
                      onClick={() => setActiveStep(2)}
                    >
                      Edit
                    </Button>
                  </div>

                  <hr />

                  <div className="mb-4">
                    <h6 className="mb-3">Order Items</h6>
                    {cartItems.map(item => (
                      <div key={item.id} className="d-flex mb-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="me-3"
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-1">{item.name}</h6>
                          <p className="mb-0 text-muted small">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-end">
                          <p className="mb-0 fw-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex justify-content-between">
                    <Button
                      variant="outline-secondary"
                      onClick={() => setActiveStep(2)}
                    >
                      Back to Payment
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handlePlaceOrder}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Processing...
                        </>
                      ) : (
                        'Place Order'
                      )}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>

          <Col lg={4}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({cartItems.length} items):</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax ({(taxRate * 100).toFixed(0)}%):</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-0">
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold text-primary fs-5">${orderTotal.toFixed(2)}</span>
                </div>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h6 className="mb-3">Need Help?</h6>
                <p className="mb-2 small">
                  <i className="bi bi-question-circle me-2"></i>
                  <a href="#" className="text-decoration-none">Shipping Information</a>
                </p>
                <p className="mb-2 small">
                  <i className="bi bi-credit-card me-2"></i>
                  <a href="#" className="text-decoration-none">Payment Methods</a>
                </p>
                <p className="mb-0 small">
                  <i className="bi bi-arrow-return-left me-2"></i>
                  <a href="#" className="text-decoration-none">Returns & Refunds</a>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .checkout-steps .step-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6c757d;
          font-weight: bold;
        }

        .checkout-steps .step-circle.active {
          background-color: var(--bs-primary);
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Checkout;