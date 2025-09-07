import React, { useState } from 'react';
import { Card, Button, Badge, Spinner, Toast, ToastContainer, Alert } from 'react-bootstrap';
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

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            setToastMessage('🔐 Please login to add items to cart');
            setToastVariant('warning');
            setShowToast(true);
            // Redirect to login after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            return;
        }

        try {
            setAdding(true);
            await addToCart(item._id);
            setToastMessage('✅ Item added to cart successfully!');
            setToastVariant('success');
            setShowToast(true);
        } catch (error) {
            setToastMessage('❌ Failed to add item to cart');
            setToastVariant('danger');
            setShowToast(true);
        } finally {
            setAdding(false);
        }
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

            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1055 }}>
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    delay={4000}
                    autohide
                    bg={toastVariant}
                >
                    <Toast.Header>
                        <strong className="me-auto">
                            {toastVariant === 'warning' ? 'Login Required' :
                                toastVariant === 'success' ? 'Success' : 'Error'}
                        </strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        {toastMessage}
                        {toastVariant === 'warning' && (
                            <div className="mt-2">
                                <small>Redirecting to login page...</small>
                            </div>
                        )}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default ProductCard;
