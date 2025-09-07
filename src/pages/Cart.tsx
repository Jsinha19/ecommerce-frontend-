import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Image, Form, Spinner, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Cart: React.FC = () => {
    const { cart, updateCartItem, removeFromCart, clearCart, loading } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

    if (!isAuthenticated) {
        return (
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Alert variant="warning" className="text-center">
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            Please login to view your cart.
                            <div className="mt-3">
                                <Button variant="primary" onClick={() => navigate('/login')}>
                                    Login
                                </Button>
                            </div>
                        </Alert>
                    </Col>
                </Row>
            </Container>
        );
    }

    const handleQuantityChange = async (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        setUpdatingItems(prev => new Set(prev).add(itemId));
        try {
            await updateCartItem(itemId, newQuantity);
        } catch (error) {
            console.error('Failed to update quantity:', error);
        } finally {
            setUpdatingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(itemId);
                return newSet;
            });
        }
    };

    const handleRemoveItem = async (itemId: string) => {
        setUpdatingItems(prev => new Set(prev).add(itemId));
        try {
            await removeFromCart(itemId);
        } catch (error) {
            console.error('Failed to remove item:', error);
        } finally {
            setUpdatingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(itemId);
                return newSet;
            });
        }
    };

    const handleClearCart = async () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            try {
                await clearCart();
            } catch (error) {
                console.error('Failed to clear cart:', error);
            }
        }
    };

    if (loading && !cart) {
        return (
            <Container className="py-5">
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3 text-muted">Loading your cart...</p>
                </div>
            </Container>
        );
    }

    const isEmpty = !cart?.items || cart.items.length === 0;

    return (
        <Container className="py-4">
            <Row>
                <Col>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>
                            <i className="bi bi-cart me-2"></i>
                            Shopping Cart
                        </h2>
                        {!isEmpty && (
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={handleClearCart}
                                disabled={loading}
                            >
                                <i className="bi bi-trash me-2"></i>
                                Clear Cart
                            </Button>
                        )}
                    </div>

                    {isEmpty ? (
                        <Card className="text-center py-5">
                            <Card.Body>
                                <i className="bi bi-cart-x display-1 text-muted"></i>
                                <h4 className="mt-3">Your cart is empty</h4>
                                <p className="text-muted">
                                    Looks like you haven't added any items to your cart yet.
                                </p>
                                <Button
                                    variant="primary"
                                    onClick={() => navigate('/')}
                                    className="mt-3"
                                >
                                    <i className="bi bi-shop me-2"></i>
                                    Continue Shopping
                                </Button>
                            </Card.Body>
                        </Card>
                    ) : (
                        <Row>
                            {/* Cart Items */}
                            <Col lg={8}>
                                <div className="mb-3">
                                    <Badge bg="primary" className="mb-3">
                                        {cart.items.reduce((total, item) => total + item.quantity, 0)} item{cart.items.reduce((total, item) => total + item.quantity, 0) !== 1 ? 's' : ''} in your cart
                                    </Badge>
                                </div>

                                {cart.items.map((cartItem) => (
                                    <Card key={cartItem._id} className="mb-3">
                                        <Card.Body>
                                            <Row className="align-items-center">
                                                <Col xs={12} sm={3} className="mb-3 mb-sm-0">
                                                    <Image
                                                        src={cartItem.item.image || 'https://via.placeholder.com/150x150?text=Product'}
                                                        alt={cartItem.item.name}
                                                        fluid
                                                        rounded
                                                        style={{ maxHeight: '120px', objectFit: 'cover' }}
                                                    />
                                                </Col>

                                                <Col xs={12} sm={4} className="mb-3 mb-sm-0">
                                                    <h6 className="mb-1">{cartItem.item.name}</h6>
                                                    <p className="text-muted small mb-2">
                                                        {cartItem.item.description.length > 100
                                                            ? `${cartItem.item.description.substring(0, 100)}...`
                                                            : cartItem.item.description
                                                        }
                                                    </p>
                                                    <Badge bg="secondary">{cartItem.item.category}</Badge>
                                                </Col>

                                                <Col xs={6} sm={2}>
                                                    <Form.Label className="small text-muted">Quantity</Form.Label>
                                                    <div className="d-flex align-items-center">
                                                        <Button
                                                            variant="outline-secondary"
                                                            size="sm"
                                                            onClick={() => handleQuantityChange(cartItem.item._id, cartItem.quantity - 1)}
                                                            disabled={cartItem.quantity <= 1 || updatingItems.has(cartItem.item._id)}
                                                        >
                                                            -
                                                        </Button>
                                                        <Form.Control
                                                            type="number"
                                                            value={cartItem.quantity}
                                                            onChange={(e) => {
                                                                const newQuantity = parseInt(e.target.value);
                                                                if (newQuantity > 0) {
                                                                    handleQuantityChange(cartItem.item._id, newQuantity);
                                                                }
                                                            }}
                                                            className="mx-2 text-center"
                                                            style={{ maxWidth: '60px' }}
                                                            min="1"
                                                            disabled={updatingItems.has(cartItem.item._id)}
                                                        />
                                                        <Button
                                                            variant="outline-secondary"
                                                            size="sm"
                                                            onClick={() => handleQuantityChange(cartItem.item._id, cartItem.quantity + 1)}
                                                            disabled={updatingItems.has(cartItem.item._id)}
                                                        >
                                                            +
                                                        </Button>
                                                    </div>
                                                </Col>

                                                <Col xs={3} sm={2}>
                                                    <div className="text-end">
                                                        <div className="h6 text-primary mb-1">
                                                            ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                                                        </div>
                                                        <small className="text-muted">
                                                            ${cartItem.item.price} each
                                                        </small>
                                                    </div>
                                                </Col>

                                                <Col xs={3} sm={1}>
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => handleRemoveItem(cartItem.item._id)}
                                                        disabled={updatingItems.has(cartItem.item._id)}
                                                        className="w-100"
                                                    >
                                                        {updatingItems.has(cartItem.item._id) ? (
                                                            <Spinner size="sm" />
                                                        ) : (
                                                            <i className="bi bi-trash"></i>
                                                        )}
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Col>

                            {/* Order Summary */}
                            <Col lg={4}>
                                <Card className="sticky-top" style={{ top: '100px' }}>
                                    <Card.Header>
                                        <h5 className="mb-0">
                                            <i className="bi bi-receipt me-2"></i>
                                            Order Summary
                                        </h5>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Subtotal:</span>
                                            <span>${cart.totalAmount.toFixed(2)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Shipping:</span>
                                            <span className="text-success">FREE</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Tax:</span>
                                            <span>${(cart.totalAmount * 0.08).toFixed(2)}</span>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between mb-3">
                                            <strong>Total:</strong>
                                            <strong className="text-primary">
                                                ${(cart.totalAmount * 1.08).toFixed(2)}
                                            </strong>
                                        </div>

                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="w-100 mb-3"
                                            disabled={loading}
                                        >
                                            <i className="bi bi-credit-card me-2"></i>
                                            Proceed to Checkout
                                        </Button>

                                        <Button
                                            variant="outline-primary"
                                            className="w-100"
                                            onClick={() => navigate('/')}
                                        >
                                            <i className="bi bi-arrow-left me-2"></i>
                                            Continue Shopping
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
