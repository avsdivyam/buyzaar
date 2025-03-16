import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar as BootstrapNavbar, Nav, Container, Button, Badge } from 'react-bootstrap';

const Navbar = () => {
  const location = useLocation();
  const { items = [] } = useSelector(state => state.cart || { items: [] });
  const { isAuthenticated = false } = useSelector(state => state.auth || { isAuthenticated: false });

  // Mock data for demonstration
  const cartItemsCount = items.length || 3;
  const mockAuthenticated = isAuthenticated || false;

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <BootstrapNavbar bg="white" expand="lg" className="navbar py-3 fixed-top">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="navbar-brand d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bag-heart me-2" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5Zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0ZM14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"/>
          </svg>
          BuyZaar
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={`nav-link ${isActive('/')}`}>
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/products" className={`nav-link ${isActive('/products')}`}>
              Products
            </Nav.Link>

            <Nav.Link as={Link} to="/cart" className={`nav-link ${isActive('/cart')} position-relative`}>
              Cart
              {cartItemsCount > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {cartItemsCount}
                </Badge>
              )}
            </Nav.Link>

            {mockAuthenticated ? (
              <Nav.Link as={Link} to="/orders" className={`nav-link ${isActive('/orders')}`}>
                My Orders
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className={`nav-link ${isActive('/login')}`}>
                Login
              </Nav.Link>
            )}

            {mockAuthenticated ? (
              <div className="d-flex align-items-center ms-lg-3">
                <div className="dropdown">
                  <a
                    href="#"
                    className="d-flex align-items-center text-decoration-none dropdown-toggle"
                    id="dropdownUser1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://ui-avatars.com/api/?name=John+Doe&background=3498db&color=fff"
                      alt="User"
                      width="32"
                      height="32"
                      className="rounded-circle me-2"
                    />
                    <span className="d-none d-sm-inline">John Doe</span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end text-small" aria-labelledby="dropdownUser1">
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                  </ul>
                </div>
              </div>
            ) : (
              <Button
                as={Link}
                to="/signup"
                variant="outline-primary"
                className="ms-lg-3"
              >
                Sign Up
              </Button>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;