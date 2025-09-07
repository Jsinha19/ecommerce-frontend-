import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-light py-5 mt-5">
            <Container>
                <Row>
                    <Col lg={3} md={6} className="mb-4">
                        <h5 className="text-warning mb-3">ABOUT</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light text-decoration-none">Contact Us</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Careers</a></li>
                            <li><a href="#" className="text-light text-decoration-none">About ShopVista</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Press</a></li>
                        </ul>
                    </Col>

                    <Col lg={3} md={6} className="mb-4">
                        <h5 className="text-warning mb-3">HELP</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light text-decoration-none">Payments</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Shipping</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Cancellation & Returns</a></li>
                            <li><a href="#" className="text-light text-decoration-none">FAQ</a></li>
                        </ul>
                    </Col>

                    <Col lg={3} md={6} className="mb-4">
                        <h5 className="text-warning mb-3">CONSUMER POLICY</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light text-decoration-none">Terms Of Use</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Privacy</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Sitemap</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Grievance Redressal</a></li>
                            <li><a href="#" className="text-light text-decoration-none">EPR Compliance</a></li>
                        </ul>
                    </Col>

                    <Col lg={3} md={6} className="mb-4">
                        <h5 className="text-warning mb-3">SOCIAL</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light text-decoration-none">Facebook</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Instagram</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Twitter</a></li>
                            <li><a href="#" className="text-light text-decoration-none">YouTube</a></li>
                        </ul>
                    </Col>
                </Row>

                <hr className="my-4" />

                <Row>
                    <Col lg={6} className="mb-4">
                        <h6 className="text-warning">Mail Us:</h6>
                        <p className="small text-muted">
                            ShopVista Internet Private Limited,<br />
                            Buildings Alyssa, Begonia &<br />
                            Clove Embassy Tech Village,<br />
                            Outer Ring Road, Devarabeesanahalli Village,<br />
                            Bengaluru, 560103,<br />
                            Karnataka, India
                        </p>
                    </Col>

                    <Col lg={6} className="mb-4">
                        <h6 className="text-warning">Registered Office Address:</h6>
                        <p className="small text-muted">
                            ShopVista Internet Private Limited,<br />
                            Buildings Alyssa, Begonia &<br />
                            Clove Embassy Tech Village,<br />
                            Outer Ring Road, Devarabeesanahalli Village,<br />
                            Bengaluru, 560103,<br />
                            Karnataka, India<br />
                            CIN : U51109KA2012PTC066107<br />
                            Telephone: <a href="tel:044-45614700" className="text-primary">044-45614700</a>
                        </p>
                    </Col>
                </Row>

                <hr className="my-4" />

                <Row className="align-items-center">
                    <Col md={4} className="mb-3">
                        <div className="d-flex align-items-center">
                            <i className="bi bi-shop text-warning me-2 fs-4"></i>
                            <span className="text-warning">Become a Seller</span>
                        </div>
                    </Col>

                    <Col md={4} className="mb-3 text-center">
                        <div className="d-flex align-items-center justify-content-center">
                            <i className="bi bi-question-circle text-warning me-2 fs-4"></i>
                            <span className="text-warning">Help Center</span>
                        </div>
                    </Col>

                    <Col md={4} className="mb-3 text-end">
                        <p className="small text-muted mb-0">© 2020-2025 ShopVista.com</p>
                    </Col>
                </Row>

                <div className="text-center mt-4">
                    <div className="payment-methods">
                        <span className="text-muted small me-3">We Accept:</span>
                        <i className="bi bi-credit-card text-warning me-2"></i>
                        <i className="bi bi-paypal text-warning me-2"></i>
                        <i className="bi bi-wallet text-warning me-2"></i>
                        <span className="text-muted small ms-3">Secure Payments</span>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
