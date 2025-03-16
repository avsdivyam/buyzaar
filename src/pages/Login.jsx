import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import Navbar from '../components/Navbar.jsx';

const Login = () => {
  const { keycloak, initialized } = useAuth();
  const { isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialized && isAuthenticated) {
      navigate('/');
    }
  }, [initialized, isAuthenticated, navigate]);

  const handleKeycloakLogin = () => {
    if (keycloak) {
      keycloak.login();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setLoading(true);

    // Simulate login process
    setTimeout(() => {
      // For demo purposes, let's check for a specific email/password
      if (email === 'user@example.com' && password === 'password') {
        // Login success - would dispatch login action in real app
        navigate('/');
      } else {
        setError('Invalid email or password. Try user@example.com / password');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <Navbar />

      {/* Add margin-top to account for fixed navbar */}
      <div style={{ marginTop: '76px' }}></div>

      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-1">Welcome Back</h2>
                  <p className="text-muted">Sign in to your account to continue</p>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email address.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <Form.Label className="mb-0">Password</Form.Label>
                      <Link to="/forgot-password" className="text-primary small">Forgot Password?</Link>
                    </div>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="6"
                    />
                    <Form.Control.Feedback type="invalid">
                      Password must be at least 6 characters.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  </Form.Group>

                  <div className="d-grid mb-4">
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Signing in...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </div>
                </Form>

                <div className="text-center mb-4">
                  <p className="text-muted mb-0">Don't have an account?</p>
                  <Link to="/signup" className="text-primary fw-semibold">Create an account</Link>
                </div>

                <div className="text-center">
                  <p className="text-muted mb-3">Or sign in with</p>
                  <div className="d-flex justify-content-center gap-2">
                    <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                      <i className="bi bi-google"></i>
                    </Button>
                    <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                      <i className="bi bi-facebook"></i>
                    </Button>
                    <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                      <i className="bi bi-apple"></i>
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className="d-flex align-items-center justify-content-center"
                      style={{ width: '50px', height: '50px' }}
                      onClick={handleKeycloakLogin}
                    >
                      <i className="bi bi-key"></i>
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <div className="text-center mt-4">
              <p className="text-muted small">
                By signing in, you agree to our <a href="#" className="text-decoration-none">Terms of Service</a> and <a href="#" className="text-decoration-none">Privacy Policy</a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;