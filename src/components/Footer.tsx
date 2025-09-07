
import { Container, Row, Col, Button } from 'react-bootstrap';

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary text-light py-3 mt-5">
            <Container>
                <Row>
                    <Col lg={4} md={6} className="mb-3">
                        <div className="mb-2">
                            <h5 className="text-light mb-2">
                                <i className="bi bi-shop me-2"></i>
                                Shop Vista
                            </h5>
                            <p className="text-light-50 small mb-2">
                                Your trusted online marketplace for quality products at great prices.
                            </p>
                        </div>
                        <div className="social-links">
                            <a href="#" className="text-light me-3">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="#" className="text-light me-3">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="#" className="text-light me-3">
                                <i className="bi bi-twitter"></i>
                            </a>
                            <a href="#" className="text-light me-3">
                                <i className="bi bi-youtube"></i>
                            </a>
                        </div>
                    </Col>

                    <Col lg={2} md={6} className="mb-3">
                        <h6 className="text-warning mb-2">SHOP</h6>
                        <ul className="list-unstyled">
                            <li className="mb-1">
                                <a href="#" className="text-light text-decoration-none small">Electronics</a>
                            </li>
                            <li className="mb-1">
                                <a href="#" className="text-light text-decoration-none small">Clothing</a>
                            </li>
                            <li className="mb-1">
                                <a href="#" className="text-light text-decoration-none small">Books</a>
                            </li>
                            <li className="mb-1">
                                <a href="#" className="text-light text-decoration-none small">Home & Garden</a>
                            </li>
                        </ul>
                    </Col>

                    <Col lg={2} md={6} className="mb-3">
                        <h6 className="text-warning mb-2">HELP</h6>
                        <ul className="list-unstyled">
                            <li className="mb-1">
                                <a href="#" className="text-light text-decoration-none small">Customer Support</a>
                            </li>
                            <li className="mb-1">
                                <a href="#" className="text-light text-decoration-none small">Shipping Info</a>
                            </li>
                            <li className="mb-1">
                                <a href="#" className="text-light text-decoration-none small">Returns</a>
                            </li>
                            <li className="mb-1">
                                <a href="#" className="text-light text-decoration-none small">FAQ</a>
                            </li>
                        </ul>
                    </Col>

                    <Col lg={4} md={6} className="mb-3">
                        <h6 className="text-warning mb-2">CONTACT</h6>
                        <p className="small text-light-50 mb-1">
                            <i className="bi bi-telephone me-2"></i>
                            +1 (555) 123-4567
                        </p>
                        <p className="small text-light-50 mb-2">
                            <i className="bi bi-envelope me-2"></i>
                            support@shopvista.com
                        </p>
                        <div className="newsletter-form">
                            <div className="input-group input-group-sm">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Subscribe to newsletter"
                                />
                                <Button variant="warning" size="sm">
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>

                <hr className="my-3 border-light-50" />

                {/* Bottom Section */}
                <Row className="align-items-center">
                    <Col md={6} className="mb-2">
                        <div className="d-flex align-items-center">
                            <span className="text-light small me-3">We Accept:</span>
                            <i className="bi bi-credit-card text-warning me-2"></i>
                            <i className="bi bi-paypal text-warning me-2"></i>
                            <i className="bi bi-wallet text-warning me-2"></i>
                            <i className="bi bi-shield-check text-warning ms-3 me-1"></i>
                            <span className="text-light small">Secure</span>
                        </div>
                    </Col>
                    <Col md={6} className="text-md-end">
                        <p className="small text-light-50 mb-1">
                            © 2025 Shop Vista. All rights reserved.
                        </p>
                        <div className="legal-links">
                            <a href="#" className="text-light-50 text-decoration-none small me-3">Privacy</a>
                            <a href="#" className="text-light-50 text-decoration-none small me-3">Terms</a>
                            <a href="#" className="text-light-50 text-decoration-none small">About</a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
