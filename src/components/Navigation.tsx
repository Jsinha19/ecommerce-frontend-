import React from 'react';
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navigation: React.FC = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const { getCartItemsCount } = useCart();
    const navigate = useNavigate();

    return (
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="shadow-sm">
            <Container>
                <Navbar.Brand
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                >
                    <img
                        src="/icon.png"
                        alt="Shop Vista"
                        height="40"
                        className="me-2"
                        style={{
                            objectFit: 'contain',
                            backgroundColor: 'white',
                            padding: '4px',
                            borderRadius: '6px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    />
                    Shop Vista
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate('/')}>
                            Home
                        </Nav.Link>
                    </Nav> */}

                    <Nav className="ms-auto">
                        {isAuthenticated ? (
                            <>
                                <Nav.Link onClick={() => navigate('/cart')}>
                                    <i className="bi bi-cart me-1"></i>
                                    Cart
                                    {getCartItemsCount() > 0 && (
                                        <Badge bg="warning" text="dark" className="ms-1">
                                            {getCartItemsCount()}
                                        </Badge>
                                    )}
                                </Nav.Link>
                                <Nav.Link disabled>
                                    <i className="bi bi-person me-1"></i>
                                    {user?.name}
                                </Nav.Link>
                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    onClick={logout}
                                    className="ms-2"
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link onClick={() => navigate('/login')}>
                                    Login
                                </Nav.Link>
                                <Nav.Link onClick={() => navigate('/register')}>
                                    Register
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
