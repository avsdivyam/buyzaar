import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Carousel, Card, Spinner } from 'react-bootstrap';
import { fetchFeaturedProducts } from '../redux/slices/productSlice';
import Navbar from '../components/Navbar.jsx';
import ProductCard from '../components/ProductCard.jsx';

// Mock featured products for demo purposes
const mockFeaturedProducts = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
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
    id: 3,
    name: 'Premium Leather Wallet',
    price: 49.99,
    rating: 4,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
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
    id: 5,
    name: 'Smartphone Gimbal Stabilizer',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.5,
    reviewCount: 56,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 6,
    name: 'Wireless Charging Pad',
    price: 29.99,
    rating: 4,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1618577608401-189f8e7f7732?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 7,
    name: 'Mechanical Keyboard',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.5,
    reviewCount: 87,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 8,
    name: 'Wireless Gaming Mouse',
    price: 69.99,
    rating: 4,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }
];

// Mock categories for demo purposes
const categories = [
  {
    id: 1,
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    itemCount: 128
  },
  {
    id: 2,
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    itemCount: 256
  },
  {
    id: 3,
    name: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    itemCount: 192
  },
  {
    id: 4,
    name: 'Beauty & Personal Care',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    itemCount: 145
  }
];

// Mock banner data
const banners = [
  {
    id: 1,
    title: 'Summer Sale',
    subtitle: 'Up to 50% off on selected items',
    image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    buttonText: 'Shop Now',
    buttonLink: '/products'
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Check out our latest products',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    buttonText: 'Discover',
    buttonLink: '/products'
  },
  {
    id: 3,
    title: 'Free Shipping',
    subtitle: 'On orders over $50',
    image: 'https://images.unsplash.com/photo-1617611647086-1b7dfde84f9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    buttonText: 'Learn More',
    buttonLink: '/shipping'
  }
];

const Home = () => {
  const dispatch = useDispatch();
  const { featuredProducts, loading } = useSelector(state => state.products);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    dispatch(fetchFeaturedProducts());

    // Simulate loading state for demo
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  // Use mock data for demo purposes
  const displayProducts = mockFeaturedProducts;

  return (
    <div className="pb-5">
      <Navbar />

      {/* Add margin-top to account for fixed navbar */}
      <div style={{ marginTop: '76px' }}></div>

      {/* Hero Carousel */}
      <Carousel className="mb-5">
        {banners.map(banner => (
          <Carousel.Item key={banner.id}>
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${banner.image})`,
                height: '500px',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <Container className="h-100 d-flex flex-column justify-content-center text-white text-center">
                <h1 className="display-4 fw-bold">{banner.title}</h1>
                <p className="lead mb-4">{banner.subtitle}</p>
                <div>
                  <Button
                    as={Link}
                    to={banner.buttonLink}
                    variant="primary"
                    size="lg"
                    className="px-4 py-2"
                  >
                    {banner.buttonText}
                  </Button>
                </div>
              </Container>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Categories Section */}
      <Container className="mb-5">
        <h2 className="section-title mb-4">Shop by Category</h2>
        <Row>
          {categories.map(category => (
            <Col key={category.id} md={6} lg={3} className="mb-4">
              <Card className="category-card h-100 border-0 shadow-custom overflow-hidden">
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <Card.Img
                    variant="top"
                    src={category.image}
                    alt={category.name}
                    className="h-100 w-100 object-fit-cover"
                    style={{ transition: 'transform 0.3s' }}
                    onMouseOver={e => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={e => e.target.style.transform = 'scale(1)'}
                  />
                </div>
                <Card.Body className="text-center">
                  <Card.Title className="mb-2">{category.name}</Card.Title>
                  <Card.Text className="text-muted small mb-3">{category.itemCount} Products</Card.Text>
                  <Button
                    as={Link}
                    to={`/products?category=${category.id}`}
                    variant="outline-primary"
                    size="sm"
                  >
                    Browse Products
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Featured Products Section */}
      <Container className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-title mb-0">Featured Products</h2>
          <Button
            as={Link}
            to="/products"
            variant="link"
            className="text-decoration-none"
          >
            View All <i className="bi bi-arrow-right"></i>
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading products...</p>
          </div>
        ) : (
          <Row>
            {displayProducts.map(product => (
              <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Features Section */}
      <Container className="mb-5">
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-4">
              <div className="mb-3">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3">
                  <i className="bi bi-truck text-primary fs-3"></i>
                </div>
              </div>
              <Card.Title>Free Shipping</Card.Title>
              <Card.Text className="text-muted">
                Free shipping on all orders over $50
              </Card.Text>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-4">
              <div className="mb-3">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3">
                  <i className="bi bi-shield-check text-primary fs-3"></i>
                </div>
              </div>
              <Card.Title>Money Back Guarantee</Card.Title>
              <Card.Text className="text-muted">
                30-day money-back guarantee
              </Card.Text>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-4">
              <div className="mb-3">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3">
                  <i className="bi bi-headset text-primary fs-3"></i>
                </div>
              </div>
              <Card.Title>24/7 Support</Card.Title>
              <Card.Text className="text-muted">
                Friendly 24/7 customer support
              </Card.Text>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Newsletter Section */}
      <div className="bg-primary bg-opacity-10 py-5 mb-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} className="text-center">
              <h3 className="mb-3">Subscribe to Our Newsletter</h3>
              <p className="text-muted mb-4">Get the latest updates on new products and upcoming sales</p>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email address"
                  aria-label="Your email address"
                />
                <Button variant="primary">
                  Subscribe
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer */}
      <footer className="footer">
        <Container>
          <Row className="gy-4">
            <Col lg={4} md={6}>
              <h5 className="text-white mb-4">BuyZaar</h5>
              <p className="text-white-50 mb-4">Your one-stop shop for all your needs. We offer a wide range of products at competitive prices.</p>
              <div className="d-flex gap-3">
                <a href="#" className="text-white-50 fs-5"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-white-50 fs-5"><i className="bi bi-twitter"></i></a>
                <a href="#" className="text-white-50 fs-5"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-white-50 fs-5"><i className="bi bi-linkedin"></i></a>
              </div>
            </Col>

            <Col lg={2} md={6}>
              <h5 className="text-white mb-4">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="footer-link">Home</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Shop</a></li>
                <li className="mb-2"><a href="#" className="footer-link">About Us</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Contact</a></li>
                <li className="mb-2"><a href="#" className="footer-link">FAQ</a></li>
              </ul>
            </Col>

            <Col lg={2} md={6}>
              <h5 className="text-white mb-4">Categories</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="footer-link">Electronics</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Fashion</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Home & Kitchen</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Beauty</a></li>
                <li className="mb-2"><a href="#" className="footer-link">Sports</a></li>
              </ul>
            </Col>

            <Col lg={4} md={6}>
              <h5 className="text-white mb-4">Contact Us</h5>
              <ul className="list-unstyled">
                <li className="mb-2 text-white-50">
                  <i className="bi bi-geo-alt me-2"></i> 123 Street, City, Country
                </li>
                <li className="mb-2 text-white-50">
                  <i className="bi bi-telephone me-2"></i> +1 234 567 8900
                </li>
                <li className="mb-2 text-white-50">
                  <i className="bi bi-envelope me-2"></i> info@buyzaar.com
                </li>
                <li className="mb-2 text-white-50">
                  <i className="bi bi-clock me-2"></i> Mon-Fri: 9AM to 5PM
                </li>
              </ul>
            </Col>
          </Row>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} BuyZaar. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Home;