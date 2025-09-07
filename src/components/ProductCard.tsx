import React, { useState } from 'react';
import { Card, Button, Badge, Spinner, Toast, ToastContainer, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Item } from '../types';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface ProductCardProps {
    item: Item;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
    const { addToCart, loading: cartLoading } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [adding, setAdding] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }

        try {
            setAdding(true);
            await addToCart(item._id);
            setShowSuccessModal(true);
        } catch (error) {
            setToastMessage('❌ Failed to add item to cart');
            setToastVariant('danger');
            setShowToast(true);
        } finally {
            setAdding(false);
        }
    };

    const handleLoginRedirect = () => {
        setShowLoginModal(false);
        navigate('/login');
    };

    const handleViewCart = () => {
        setShowSuccessModal(false);
        navigate('/cart');
    };

    const handleContinueShopping = () => {
        setShowSuccessModal(false);
    };

    const getCategoryBadgeColor = (category: string) => {
        const colors: { [key: string]: string } = {
            electronics: 'dark',
            clothing: 'success',
            books: 'info',
            home: 'warning',
            sports: 'danger',
            beauty: 'secondary',
        };
        return colors[category] || 'secondary';
    };

    return (
        <>
            <Card className="h-100 shadow-sm">
                <Card.Img
                    variant="top"
                    src={item.image || 'https://via.placeholder.com/300x200?text=Product+Image'}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                    <div className="mb-2">
                        <Badge bg={getCategoryBadgeColor(item.category)} className="mb-2">
                            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </Badge>
                    </div>

                    <Card.Title className="h6">{item.name}</Card.Title>
                    <Card.Text className="text-muted small flex-grow-1">
                        {item.description.length > 100
                            ? `${item.description.substring(0, 100)}...`
                            : item.description
                        }
                    </Card.Text>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                            <h5 className="text-primary mb-0">${item.price}</h5>
                            <small className="text-muted">Stock: {item.stock}</small>
                        </div>
                        <div className="text-end">
                            <div className="text-warning">
                                {[...Array(5)].map((_, i) => (
                                    <i
                                        key={i}
                                        className={`bi bi-star${i < Math.floor(item.rating) ? '-fill' : ''}`}
                                    ></i>
                                ))}
                            </div>
                            <small className="text-muted">({item.rating})</small>
                        </div>
                    </div>

                    <Button
                        variant="primary"
                        onClick={handleAddToCart}
                        disabled={adding || cartLoading || item.stock === 0}
                        className="w-100"
                    >
                        {adding ? (
                            <>
                                <Spinner size="sm" className="me-2" />
                                Adding...
                            </>
                        ) : item.stock === 0 ? (
                            'Out of Stock'
                        ) : (
                            <>
                                <i className="bi bi-cart-plus me-2"></i>
                                Add to Cart
                            </>
                        )}
                    </Button>
                </Card.Body>
            </Card>

            {/* Login Required Modal */}
            <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="bi bi-lock me-2 text-warning"></i>
                        Login Required
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <div className="mb-3">
                        <i className="bi bi-person-circle display-1 text-primary"></i>
                    </div>
                    <h5>Please login to add items to your cart</h5>
                    <p className="text-muted">
                        You need to be logged in to start shopping and add items to your cart.
                    </p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleLoginRedirect}>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Go to Login
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i className="bi bi-check-circle me-2 text-success"></i>
                        Item Added Successfully!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <div className="mb-3">
                        <i className="bi bi-cart-check display-1 text-success"></i>
                    </div>
                    <h5>"{item.name}" has been added to your cart</h5>
                    <p className="text-muted">
                        What would you like to do next?
                    </p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button variant="outline-primary" onClick={handleContinueShopping}>
                        <i className="bi bi-arrow-left me-2"></i>
                        Continue Shopping
                    </Button>
                    <Button variant="primary" onClick={handleViewCart}>
                        <i className="bi bi-cart me-2"></i>
                        View Cart
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Error Toast */}
            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1055 }}>
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    delay={4000}
                    autohide
                    bg={toastVariant}
                >
                    <Toast.Header>
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        {toastMessage}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default ProductCard;
