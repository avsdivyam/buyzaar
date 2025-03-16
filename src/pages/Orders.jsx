import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button, Badge, Tabs, Tab, Spinner, Alert } from 'react-bootstrap';
import Navbar from '../components/Navbar.jsx';

// In a real app, you would fetch this from an API
const mockOrders = [
  {
    id: 'ORD-1234',
    date: '2023-05-15',
    status: 'Delivered',
    total: 129.99,
    paymentMethod: 'Credit Card',
    shippingAddress: '123 Main St, Anytown, USA',
    trackingNumber: 'TRK123456789',
    items: [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        price: 79.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        id: 2,
        name: 'Phone Case',
        price: 24.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      }
    ]
  },
  {
    id: 'ORD-5678',
    date: '2023-04-28',
    status: 'Processing',
    total: 349.95,
    paymentMethod: 'PayPal',
    shippingAddress: '456 Oak St, Somewhere, USA',
    items: [
      {
        id: 3,
        name: 'Smart Watch Series 5',
        price: 199.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        id: 4,
        name: 'Portable Bluetooth Speaker',
        price: 149.96,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      }
    ]
  },
  {
    id: 'ORD-9012',
    date: '2023-04-15',
    status: 'Shipped',
    total: 89.99,
    paymentMethod: 'Credit Card',
    shippingAddress: '789 Pine St, Elsewhere, USA',
    trackingNumber: 'TRK987654321',
    items: [
      {
        id: 5,
        name: 'Wireless Charging Pad',
        price: 29.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1618577608401-189f8e7f7732?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        id: 6,
        name: 'Premium Leather Wallet',
        price: 59.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      }
    ]
  },
  {
    id: 'ORD-3456',
    date: '2023-03-22',
    status: 'Cancelled',
    total: 129.99,
    paymentMethod: 'Credit Card',
    shippingAddress: '101 Maple St, Nowhere, USA',
    cancellationReason: 'Customer requested cancellation',
    items: [
      {
        id: 7,
        name: 'Mechanical Keyboard',
        price: 129.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      }
    ]
  }
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const { isAuthenticated = true } = useSelector(state => state.auth || { isAuthenticated: true });

  useEffect(() => {
    // Simulate API call
    const fetchOrders = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await orderService.getOrders();
        // setOrders(response.data);

        // Using mock data for now
        setTimeout(() => {
          setOrders(mockOrders);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on active tab
  const getFilteredOrders = () => {
    if (activeTab === 'all') {
      return orders;
    }
    return orders.filter(order => order.status.toLowerCase() === activeTab);
  };

  const getStatusBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'processing':
        return 'primary';
      case 'shipped':
        return 'info';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  if (!isAuthenticated) {
    return (
      <div>
        <Navbar />
        <Container className="py-5 mt-5">
          <Row className="justify-content-center">
            <Col md={8} lg={6} className="text-center">
              <div className="mb-4">
                <i className="bi bi-lock text-muted" style={{ fontSize: '4rem' }}></i>
              </div>
              <h2 className="mb-3">Login Required</h2>
              <p className="text-muted mb-4">Please log in to view your order history.</p>
              <Button
                as={Link}
                to="/login"
                variant="primary"
                size="lg"
              >
                Login
              </Button>
            </Col>
          </Row>
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
        <h1 className="mb-4">My Orders</h1>

        {isLoading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="bi bi-bag text-muted" style={{ fontSize: '4rem' }}></i>
            </div>
            <h3 className="mb-3">No Orders Found</h3>
            <p className="text-muted mb-4">You haven't placed any orders yet.</p>
            <Button
              as={Link}
              to="/products"
              variant="primary"
              size="lg"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-4"
            >
              <Tab eventKey="all" title="All Orders">
                {/* Content will be rendered below */}
              </Tab>
              <Tab eventKey="processing" title="Processing">
                {/* Content will be rendered below */}
              </Tab>
              <Tab eventKey="shipped" title="Shipped">
                {/* Content will be rendered below */}
              </Tab>
              <Tab eventKey="delivered" title="Delivered">
                {/* Content will be rendered below */}
              </Tab>
              <Tab eventKey="cancelled" title="Cancelled">
                {/* Content will be rendered below */}
              </Tab>
            </Tabs>

            {getFilteredOrders().length === 0 ? (
              <Alert variant="info">
                No orders found with the selected status.
              </Alert>
            ) : (
              getFilteredOrders().map(order => (
                <Card key={order.id} className="mb-4 border-0 shadow-sm">
                  <Card.Header className="bg-white py-3">
                    <Row className="align-items-center">
                      <Col xs={12} md={4} className="mb-2 mb-md-0">
                        <h5 className="mb-0">Order #{order.id}</h5>
                      </Col>
                      <Col xs={12} md={4} className="mb-2 mb-md-0 text-md-center">
                        <span className="text-muted">Placed on {order.date}</span>
                      </Col>
                      <Col xs={12} md={4} className="text-md-end">
                        <Badge bg={getStatusBadgeVariant(order.status)} pill>
                          {order.status}
                        </Badge>
                      </Col>
                    </Row>
                  </Card.Header>

                  <Card.Body className="p-0">
                    {order.items.map(item => (
                      <div key={item.id} className="p-3 border-bottom">
                        <Row className="align-items-center">
                          <Col xs={3} sm={2}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="img-fluid rounded"
                              style={{ maxHeight: '80px', objectFit: 'cover' }}
                            />
                          </Col>
                          <Col xs={9} sm={6}>
                            <h6 className="mb-1">{item.name}</h6>
                            <p className="text-muted small mb-0">Quantity: {item.quantity}</p>
                          </Col>
                          <Col xs={12} sm={4} className="text-sm-end mt-2 mt-sm-0">
                            <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                          </Col>
                        </Row>
                      </div>
                    ))}
                  </Card.Body>

                  <Card.Footer className="bg-white py-3">
                    <Row className="align-items-center">
                      <Col xs={12} md={6} className="mb-3 mb-md-0">
                        <div className="d-flex flex-column flex-sm-row gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            as={Link}
                            to={`/orders/${order.id}`}
                          >
                            View Details
                          </Button>

                          {order.status.toLowerCase() === 'delivered' && (
                            <Button
                              variant="outline-secondary"
                              size="sm"
                            >
                              Write a Review
                            </Button>
                          )}

                          {(order.status.toLowerCase() === 'shipped' || order.status.toLowerCase() === 'delivered') && (
                            <Button
                              variant="outline-info"
                              size="sm"
                            >
                              Track Order
                            </Button>
                          )}

                          {order.status.toLowerCase() === 'processing' && (
                            <Button
                              variant="outline-danger"
                              size="sm"
                            >
                              Cancel Order
                            </Button>
                          )}
                        </div>
                      </Col>
                      <Col xs={12} md={6} className="text-md-end">
                        <div className="d-flex flex-column align-items-start align-items-md-end">
                          <div className="mb-1">
                            <span className="text-muted me-2">Order Total:</span>
                            <span className="fw-bold fs-5">${order.total.toFixed(2)}</span>
                          </div>
                          <small className="text-muted">
                            Paid via {order.paymentMethod}
                          </small>
                        </div>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              ))
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Orders;