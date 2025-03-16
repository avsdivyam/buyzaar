import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Spinner, Breadcrumb, Pagination, InputGroup, Offcanvas } from 'react-bootstrap';
import { fetchProducts } from '../redux/slices/productSlice';
import Navbar from '../components/Navbar.jsx';
import ProductCard from '../components/ProductCard.jsx';

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Smart Watch Series 5',
    price: 199.99,
    originalPrice: 249.99,
    rating: 5,
    reviewCount: 96,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Electronics'
  },
  {
    id: 3,
    name: 'Premium Leather Wallet',
    price: 49.99,
    rating: 4,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Fashion'
  },
  {
    id: 4,
    name: 'Portable Bluetooth Speaker',
    price: 59.99,
    originalPrice: 79.99,
    rating: 4,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Electronics'
  },
  {
    id: 5,
    name: 'Smartphone Gimbal Stabilizer',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.5,
    reviewCount: 56,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Electronics'
  },
  {
    id: 6,
    name: 'Wireless Charging Pad',
    price: 29.99,
    rating: 4,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1618577608401-189f8e7f7732?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Electronics'
  },
  {
    id: 7,
    name: 'Mechanical Keyboard',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.5,
    reviewCount: 87,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Electronics'
  },
  {
    id: 8,
    name: 'Wireless Gaming Mouse',
    price: 69.99,
    rating: 4,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Electronics'
  },
  {
    id: 9,
    name: 'Cotton T-Shirt',
    price: 19.99,
    rating: 4.5,
    reviewCount: 215,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Fashion'
  },
  {
    id: 10,
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    originalPrice: 34.99,
    rating: 4,
    reviewCount: 178,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Home & Kitchen'
  },
  {
    id: 11,
    name: 'Ceramic Coffee Mug Set',
    price: 39.99,
    rating: 4.5,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Home & Kitchen'
  },
  {
    id: 12,
    name: 'Facial Cleanser',
    price: 14.99,
    rating: 4,
    reviewCount: 143,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'Beauty & Personal Care'
  }
];

// Categories
const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'Electronics', name: 'Electronics' },
  { id: 'Fashion', name: 'Fashion' },
  { id: 'Home & Kitchen', name: 'Home & Kitchen' },
  { id: 'Beauty & Personal Care', name: 'Beauty & Personal Care' }
];

// Brands
const brands = [
  { id: 'apple', name: 'Apple' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'sony', name: 'Sony' },
  { id: 'nike', name: 'Nike' },
  { id: 'adidas', name: 'Adidas' },
  { id: 'ikea', name: 'IKEA' }
];

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Get category from URL params
  const categoryParam = searchParams.get('category') || 'all';

  const [filters, setFilters] = useState({
    category: categoryParam,
    minPrice: '',
    maxPrice: '',
    sortBy: 'newest',
    brands: [],
    rating: '',
    page: 1
  });

  // Filter products based on criteria
  const filterProducts = (products) => {
    return products.filter(product => {
      // Filter by category
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }

      // Filter by price range
      if (filters.minPrice && product.price < parseFloat(filters.minPrice)) {
        return false;
      }

      if (filters.maxPrice && product.price > parseFloat(filters.maxPrice)) {
        return false;
      }

      // Filter by rating
      if (filters.rating && product.rating < parseInt(filters.rating)) {
        return false;
      }

      // Filter by brands
      if (filters.brands.length > 0) {
        // In a real app, you would check if product.brand is in filters.brands
        // For mock data, we'll just return true since we don't have brand data
        return true;
      }

      return true;
    });
  };

  // Sort products based on criteria
  const sortProducts = (products) => {
    const sortedProducts = [...products];

    switch (filters.sortBy) {
      case 'price_low':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'price_high':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'rating':
        return sortedProducts.sort((a, b) => b.rating - a.rating);
      case 'popular':
        return sortedProducts.sort((a, b) => b.reviewCount - a.reviewCount);
      case 'newest':
      default:
        // For mock data, we'll just return as is
        return sortedProducts;
    }
  };

  useEffect(() => {
    // Update category filter when URL param changes
    setFilters(prev => ({
      ...prev,
      category: categoryParam
    }));

    // Simulate API call
    dispatch(fetchProducts(filters));

    // Simulate loading state for demo
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch, categoryParam]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      // Reset to page 1 when filters change
      page: 1
    }));
  };

  const handleBrandChange = (e) => {
    const { value, checked } = e.target;

    setFilters(prev => {
      if (checked) {
        return {
          ...prev,
          brands: [...prev.brands, value],
          page: 1
        };
      } else {
        return {
          ...prev,
          brands: prev.brands.filter(brand => brand !== value),
          page: 1
        };
      }
    });
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      minPrice: '',
      maxPrice: '',
      sortBy: 'newest',
      brands: [],
      rating: '',
      page: 1
    });
  };

  // Apply filters and sorting to mock data
  const filteredProducts = sortProducts(filterProducts(mockProducts));

  // Pagination
  const productsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (filters.page - 1) * productsPerPage,
    filters.page * productsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setFilters(prev => ({
      ...prev,
      page: pageNumber
    }));

    // Scroll to top when page changes
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <Navbar />

      {/* Add margin-top to account for fixed navbar */}
      <div style={{ marginTop: '76px' }}></div>

      <Container className="py-5">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Products</Breadcrumb.Item>
          {filters.category !== 'all' && (
            <Breadcrumb.Item active>{filters.category}</Breadcrumb.Item>
          )}
        </Breadcrumb>

        <Row>
          {/* Filters for desktop */}
          <Col lg={3} className="d-none d-lg-block">
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Filters</h5>
                <Button
                  variant="link"
                  className="p-0 text-decoration-none"
                  onClick={handleClearFilters}
                >
                  Clear All
                </Button>
              </Card.Header>
              <Card.Body>
                <div className="mb-4">
                  <h6 className="mb-3">Categories</h6>
                  <Form>
                    {categories.map(category => (
                      <Form.Check
                        key={category.id}
                        type="radio"
                        id={`category-${category.id}`}
                        label={category.name}
                        name="category"
                        value={category.id}
                        checked={filters.category === category.id}
                        onChange={handleFilterChange}
                        className="mb-2"
                      />
                    ))}
                  </Form>
                </div>

                <hr />

                <div className="mb-4">
                  <h6 className="mb-3">Price Range</h6>
                  <Row className="g-2">
                    <Col xs={6}>
                      <Form.Control
                        type="number"
                        placeholder="Min"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        min="0"
                      />
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type="number"
                        placeholder="Max"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        min="0"
                      />
                    </Col>
                  </Row>
                </div>

                <hr />

                <div className="mb-4">
                  <h6 className="mb-3">Brands</h6>
                  <Form>
                    {brands.map(brand => (
                      <Form.Check
                        key={brand.id}
                        type="checkbox"
                        id={`brand-${brand.id}`}
                        label={brand.name}
                        value={brand.id}
                        checked={filters.brands.includes(brand.id)}
                        onChange={handleBrandChange}
                        className="mb-2"
                      />
                    ))}
                  </Form>
                </div>

                <hr />

                <div className="mb-4">
                  <h6 className="mb-3">Rating</h6>
                  <Form>
                    {[4, 3, 2, 1].map(rating => (
                      <Form.Check
                        key={rating}
                        type="radio"
                        id={`rating-${rating}`}
                        label={
                          <div className="d-flex align-items-center">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`bi ${i < rating ? 'bi-star-fill' : 'bi-star'} text-warning`}
                              ></i>
                            ))}
                            <span className="ms-2">& Up</span>
                          </div>
                        }
                        name="rating"
                        value={rating}
                        checked={filters.rating === rating.toString()}
                        onChange={handleFilterChange}
                        className="mb-2"
                      />
                    ))}
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Products Grid */}
          <Col lg={9}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white py-3">
                <Row className="align-items-center">
                  <Col xs={12} md={4} className="mb-2 mb-md-0">
                    <h5 className="mb-0">
                      {filteredProducts.length} Products
                    </h5>
                  </Col>
                  <Col xs={12} md={8}>
                    <div className="d-flex justify-content-md-end">
                      <Button
                        variant="outline-secondary"
                        className="me-2 d-lg-none"
                        onClick={() => setShowFilters(true)}
                      >
                        <i className="bi bi-funnel me-2"></i>
                        Filters
                      </Button>

                      <Form.Select
                        name="sortBy"
                        value={filters.sortBy}
                        onChange={handleFilterChange}
                        className="ms-auto"
                        style={{ width: 'auto' }}
                      >
                        <option value="newest">Newest</option>
                        <option value="price_low">Price: Low to High</option>
                        <option value="price_high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                        <option value="popular">Most Popular</option>
                      </Form.Select>
                    </div>
                  </Col>
                </Row>
              </Card.Header>

              <Card.Body className="p-3 p-md-4">
                {isLoading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3">Loading products...</p>
                  </div>
                ) : currentProducts.length > 0 ? (
                  <Row>
                    {currentProducts.map(product => (
                      <Col key={product.id} sm={6} md={6} lg={4} xl={3} className="mb-4">
                        <ProductCard product={product} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div className="text-center py-5">
                    <div className="mb-4">
                      <i className="bi bi-search text-muted" style={{ fontSize: '3rem' }}></i>
                    </div>
                    <h4>No products found</h4>
                    <p className="text-muted">
                      Try adjusting your filters or search criteria.
                    </p>
                    <Button
                      variant="primary"
                      onClick={handleClearFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                      <Pagination.First
                        onClick={() => handlePageChange(1)}
                        disabled={filters.page === 1}
                      />
                      <Pagination.Prev
                        onClick={() => handlePageChange(filters.page - 1)}
                        disabled={filters.page === 1}
                      />

                      {[...Array(totalPages)].map((_, i) => (
                        <Pagination.Item
                          key={i + 1}
                          active={i + 1 === filters.page}
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </Pagination.Item>
                      ))}

                      <Pagination.Next
                        onClick={() => handlePageChange(filters.page + 1)}
                        disabled={filters.page === totalPages}
                      />
                      <Pagination.Last
                        onClick={() => handlePageChange(totalPages)}
                        disabled={filters.page === totalPages}
                      />
                    </Pagination>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Mobile Filters Offcanvas */}
      <Offcanvas show={showFilters} onHide={() => setShowFilters(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mb-4">
            <h6 className="mb-3">Categories</h6>
            <Form>
              {categories.map(category => (
                <Form.Check
                  key={category.id}
                  type="radio"
                  id={`mobile-category-${category.id}`}
                  label={category.name}
                  name="category"
                  value={category.id}
                  checked={filters.category === category.id}
                  onChange={(e) => {
                    handleFilterChange(e);
                    setShowFilters(false);
                  }}
                  className="mb-2"
                />
              ))}
            </Form>
          </div>

          <hr />

          <div className="mb-4">
            <h6 className="mb-3">Price Range</h6>
            <Row className="g-2">
              <Col xs={6}>
                <Form.Control
                  type="number"
                  placeholder="Min"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  min="0"
                />
              </Col>
              <Col xs={6}>
                <Form.Control
                  type="number"
                  placeholder="Max"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  min="0"
                />
              </Col>
            </Row>
          </div>

          <hr />

          <div className="mb-4">
            <h6 className="mb-3">Brands</h6>
            <Form>
              {brands.map(brand => (
                <Form.Check
                  key={brand.id}
                  type="checkbox"
                  id={`mobile-brand-${brand.id}`}
                  label={brand.name}
                  value={brand.id}
                  checked={filters.brands.includes(brand.id)}
                  onChange={handleBrandChange}
                  className="mb-2"
                />
              ))}
            </Form>
          </div>

          <hr />

          <div className="mb-4">
            <h6 className="mb-3">Rating</h6>
            <Form>
              {[4, 3, 2, 1].map(rating => (
                <Form.Check
                  key={rating}
                  type="radio"
                  id={`mobile-rating-${rating}`}
                  label={
                    <div className="d-flex align-items-center">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`bi ${i < rating ? 'bi-star-fill' : 'bi-star'} text-warning`}
                        ></i>
                      ))}
                      <span className="ms-2">& Up</span>
                    </div>
                  }
                  name="rating"
                  value={rating}
                  checked={filters.rating === rating.toString()}
                  onChange={handleFilterChange}
                  className="mb-2"
                />
              ))}
            </Form>
          </div>

          <div className="d-grid gap-2">
            <Button
              variant="primary"
              onClick={() => setShowFilters(false)}
            >
              Apply Filters
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => {
                handleClearFilters();
                setShowFilters(false);
              }}
            >
              Clear All
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ProductList;