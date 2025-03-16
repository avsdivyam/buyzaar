import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Spinner, Alert, Breadcrumb, Tabs, Tab, Form, InputGroup, Card, Badge } from 'react-bootstrap';
import { fetchProductById } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Navbar from '../components/Navbar.jsx';

// Mock product data
const mockProduct = {
  id: 1,
  name: 'Wireless Bluetooth Headphones',
  price: 79.99,
  originalPrice: 99.99,
  description: 'Experience premium sound quality with these wireless Bluetooth headphones. Features include noise cancellation, long battery life, and comfortable ear cushions for extended wear. Perfect for music lovers and professionals alike.',
  category: 'Electronics',
  inStock: true,
  rating: 4.5,
  reviewCount: 128,
  sku: 'WBH-1234',
  brand: 'SoundMaster',
  color: 'Black',
  features: [
    'Active Noise Cancellation',
    '30-hour battery life',
    'Quick charge - 5 minutes for 1 hour playback',
    'Bluetooth 5.0 connectivity',
    'Built-in microphone for calls',
    'Voice assistant compatible'
  ],
  specifications: {
    'Bluetooth Version': '5.0',
    'Battery Life': '30 hours',
    'Charging Time': '2 hours',
    'Driver Size': '40mm',
    'Frequency Response': '20Hz - 20kHz',
    'Weight': '250g'
  },
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  ],
  reviews: [
    {
      id: 1,
      author: 'John Smith',
      rating: 5,
      date: '2023-05-15',
      title: 'Best headphones I\'ve ever owned',
      content: 'These headphones are amazing! The sound quality is exceptional, and the noise cancellation works perfectly. Battery life is as advertised - I can go days without charging. Highly recommend!'
    },
    {
      id: 2,
      author: 'Sarah Johnson',
      rating: 4,
      date: '2023-04-28',
      title: 'Great sound, slightly uncomfortable after long use',
      content: 'The sound quality is fantastic and the battery life is impressive. My only complaint is that they start to hurt my ears after about 3 hours of continuous use. Otherwise, they\'re perfect!'
    },
    {
      id: 3,
      author: 'Michael Brown',
      rating: 5,
      date: '2023-04-10',
      title: 'Worth every penny',
      content: 'I was hesitant to spend this much on headphones, but they\'re worth every penny. The sound is crisp and clear, and the noise cancellation is a game-changer for my daily commute.'
    }
  ],
  relatedProducts: [
    {
      id: 2,
      name: 'Smart Watch Series 5',
      price: 199.99,
      originalPrice: 249.99,
      rating: 5,
      reviewCount: 96,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 4,
      name: 'Portable Bluetooth Speaker',
      price: 59.99,
      originalPrice: 79.99,
      rating: 4,
      reviewCount: 78,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 6,
      name: 'Wireless Charging Pad',
      price: 29.99,
      rating: 4,
      reviewCount: 112,
      image: 'https://images.unsplash.com/photo-1618577608401-189f8e7f7732?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ]
};

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, loading, error } = useSelector(state => state.products);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    // Simulate API call
    dispatch(fetchProductById(id));

    // Simulate loading state for demo
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, id]);

  // Use mock data for demo
  const product = mockProduct;

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: product.id,
      quantity: quantity
    }));

    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <Container className="py-5 mt-5">
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading product details...</p>
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
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/products' }}>Products</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/products?category=${product.category}` }}>{product.category}</Breadcrumb.Item>
          <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
        </Breadcrumb>

        {/* Added to cart alert */}
        {addedToCart && (
          <Alert variant="success" className="mb-4">
            <i className="bi bi-check-circle-fill me-2"></i>
            Product added to cart successfully!
          </Alert>
        )}

        <Row>
          {/* Product Images */}
          <Col lg={6} className="mb-4">
            <div className="product-images">
              <div className="main-image mb-3">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="img-fluid rounded shadow-sm"
                  style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
              </div>
              <Row className="g-2">
                {product.images.map((image, index) => (
                  <Col xs={4} key={index}>
                    <img
                      src={image}
                      alt={`${product.name} - view ${index + 1}`}
                      className={`img-fluid rounded cursor-pointer ${selectedImage === index ? 'border border-primary border-2' : 'opacity-75'}`}
                      style={{ height: '100px', objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => setSelectedImage(index)}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </Col>

          {/* Product Info */}
          <Col lg={6}>
            <div className="product-info">
              <h1 className="product-title mb-2">{product.name}</h1>

              <div className="d-flex align-items-center mb-3">
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`bi ${i < Math.floor(product.rating) ? 'bi-star-fill' : i < product.rating ? 'bi-star-half' : 'bi-star'}`}
                    ></i>
                  ))}
                </div>
                <span className="rating-count">({product.reviewCount} reviews)</span>
              </div>

              <div className="mb-4">
                <span className="product-price">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="original-price ms-2">${product.originalPrice.toFixed(2)}</span>
                    <Badge bg="danger" className="ms-2">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  </>
                )}
              </div>

              <div className="product-description mb-4">
                <p>{product.description}</p>
              </div>

              <div className="product-meta mb-4">
                <div className="product-meta-item">
                  <span className="meta-label">Availability:</span>
                  <span className={product.inStock ? 'text-success' : 'text-danger'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="product-meta-item">
                  <span className="meta-label">SKU:</span>
                  <span>{product.sku}</span>
                </div>
                <div className="product-meta-item">
                  <span className="meta-label">Brand:</span>
                  <span>{product.brand}</span>
                </div>
                <div className="product-meta-item">
                  <span className="meta-label">Category:</span>
                  <Link to={`/products?category=${product.category}`}>{product.category}</Link>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <span className="me-3">Quantity:</span>
                  <InputGroup style={{ width: '150px' }}>
                    <Button variant="outline-secondary" onClick={decreaseQuantity}>-</Button>
                    <Form.Control
                      type="number"
                      min="1"
                      max="10"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="text-center"
                    />
                    <Button variant="outline-secondary" onClick={increaseQuantity}>+</Button>
                  </InputGroup>
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex mb-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="px-5"
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  Add to Cart
                </Button>
                <Button
                  variant="outline-secondary"
                  size="lg"
                  className="px-3"
                >
                  <i className="bi bi-heart"></i>
                </Button>
              </div>

              <div className="d-flex gap-3 mb-4">
                <Button variant="outline-primary" className="d-flex align-items-center">
                  <i className="bi bi-share me-2"></i> Share
                </Button>
                <Button variant="outline-primary" className="d-flex align-items-center">
                  <i className="bi bi-question-circle me-2"></i> Ask a Question
                </Button>
              </div>

              <div className="payment-methods p-3 bg-light rounded">
                <p className="mb-2 fw-bold">Secure Payment Methods:</p>
                <div className="d-flex gap-3">
                  <i className="bi bi-credit-card fs-3"></i>
                  <i className="bi bi-paypal fs-3"></i>
                  <i className="bi bi-apple fs-3"></i>
                  <i className="bi bi-google fs-3"></i>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Product Details Tabs */}
        <div className="mt-5">
          <Tabs defaultActiveKey="description" className="mb-4">
            <Tab eventKey="description" title="Description">
              <div className="p-4 bg-white rounded shadow-sm">
                <h4 className="mb-3">Product Description</h4>
                <p>{product.description}</p>

                <h5 className="mt-4 mb-3">Key Features</h5>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </Tab>

            <Tab eventKey="specifications" title="Specifications">
              <div className="p-4 bg-white rounded shadow-sm">
                <h4 className="mb-3">Technical Specifications</h4>
                <table className="table">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key}>
                        <th style={{ width: '30%' }}>{key}</th>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tab>

            <Tab eventKey="reviews" title={`Reviews (${product.reviews.length})`}>
              <div className="p-4 bg-white rounded shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="mb-0">Customer Reviews</h4>
                  <Button variant="primary">Write a Review</Button>
                </div>

                <div className="mb-4">
                  <div className="d-flex align-items-center mb-2">
                    <h5 className="mb-0 me-2">Average Rating:</h5>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`bi ${i < Math.floor(product.rating) ? 'bi-star-fill' : i < product.rating ? 'bi-star-half' : 'bi-star'}`}
                        ></i>
                      ))}
                    </div>
                    <span className="ms-2">{product.rating} out of 5</span>
                  </div>
                  <p>Based on {product.reviewCount} reviews</p>
                </div>

                {product.reviews.map(review => (
                  <Card key={review.id} className="mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between mb-2">
                        <h5 className="card-title">{review.title}</h5>
                        <div className="rating">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`bi ${i < review.rating ? 'bi-star-fill' : 'bi-star'}`}
                            ></i>
                          ))}
                        </div>
                      </div>
                      <h6 className="card-subtitle mb-2 text-muted">
                        By {review.author} on {review.date}
                      </h6>
                      <p className="card-text">{review.content}</p>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-5">
          <h3 className="section-title mb-4">Related Products</h3>
          <Row>
            {product.relatedProducts.map(relatedProduct => (
              <Col key={relatedProduct.id} md={4} className="mb-4">
                <Card className="h-100 product-card">
                  {relatedProduct.originalPrice && relatedProduct.originalPrice > relatedProduct.price && (
                    <div className="discount-badge">
                      {Math.round(((relatedProduct.originalPrice - relatedProduct.price) / relatedProduct.originalPrice) * 100)}% OFF
                    </div>
                  )}

                  <Card.Img
                    variant="top"
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="card-img-top"
                  />

                  <Card.Body className="d-flex flex-column">
                    <div className="mb-2">
                      <div className="rating">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`bi ${i < relatedProduct.rating ? 'bi-star-fill' : 'bi-star'}`}
                          ></i>
                        ))}
                        <span className="rating-count">({relatedProduct.reviewCount})</span>
                      </div>
                    </div>

                    <Card.Title className="card-title">{relatedProduct.name}</Card.Title>

                    <div className="mb-3 d-flex align-items-center">
                      <span className="price">${relatedProduct.price.toFixed(2)}</span>
                      {relatedProduct.originalPrice && (
                        <span className="original-price">${relatedProduct.originalPrice.toFixed(2)}</span>
                      )}
                    </div>

                    <div className="mt-auto">
                      <Button
                        as={Link}
                        to={`/products/${relatedProduct.id}`}
                        variant="primary"
                        className="w-100"
                      >
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;