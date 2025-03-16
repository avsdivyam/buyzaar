import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar.jsx';

const NotFound = () => {
  return (
    <div>
      <Navbar />

      {/* Add margin-top to account for fixed navbar */}
      <div style={{ marginTop: '76px' }}></div>

      <Container className="py-5">
        <Row className="justify-content-center text-center">
          <Col md={8} lg={6}>
            <div className="py-5">
              <div className="mb-4">
                <img
                  src="https://illustrations.popsy.co/amber/crashed-error.svg"
                  alt="404 Illustration"
                  style={{ maxWidth: '300px', width: '100%' }}
                />
              </div>
              <h1 className="display-1 fw-bold text-primary mb-3">404</h1>
              <h2 className="mb-3">Page Not Found</h2>
              <p className="text-muted mb-4">
                Oops! The page you are looking for doesn't exist or has been moved.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button
                  as={Link}
                  to="/"
                  variant="primary"
                  size="lg"
                >
                  Back to Home
                </Button>
                <Button
                  as={Link}
                  to="/products"
                  variant="outline-primary"
                  size="lg"
                >
                  Browse Products
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFound;