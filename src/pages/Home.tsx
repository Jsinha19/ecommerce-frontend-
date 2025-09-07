"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { Container, Row, Col, Spinner, Alert, Pagination, Button, Carousel, Card } from "react-bootstrap"
import {
  ArrowRight,
  RotateCcw,
  Award,
  Truck,
  Zap,
  Star,
  Clock,
  Gift,
  Grid3X3,
  LucideTriangle as ExclamationTriangle,
  Search,
} from "lucide-react"
import type { Item, FilterParams, ItemsResponse } from "../types"
import { itemsAPI } from "../services/api"
import ProductCard from "../components/ProductCard"
import FilterSidebar from "../components/FilterSidebar"

const sliderData = [
  {
    id: 1,
    title: "Curtains for Your Home",
    subtitle: "From ₹95",
    description: "Latest Prints & Patterns",
    buttonText: "Shop Now",
    backgroundImage: "/elegant-curtains-on-golden-platform.jpg",
  },
  {
    id: 2,
    title: "Summer Collection",
    subtitle: "Up to 50% Off",
    description: "Trendy Designs & Premium Quality",
    buttonText: "Explore Now",
    backgroundImage: "/summer-home-decor-collection.jpg",
  },
  {
    id: 3,
    title: "Premium Furniture",
    subtitle: "Starting ₹999",
    description: "Transform Your Living Space",
    buttonText: "Shop Furniture",
    backgroundImage: "/modern-living-room.png",
  },
]

const Home: React.FC = () => {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNext: false,
    hasPrev: false,
  })
  const [filters, setFilters] = useState<FilterParams>({
    category: "all",
    page: 1,
    limit: 12,
  })
  const [showFilters, setShowFilters] = useState(false)
  const featuredProductsRef = useRef<HTMLDivElement>(null)

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true)
      setError("")
      const response: ItemsResponse = await itemsAPI.getItems(filters)
      setItems(response.items)
      setPagination(response.pagination)
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch products")
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const handleFilterChange = (newFilters: FilterParams) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({
      category: "all",
      page: 1,
      limit: 12,
    })
  }

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }))
  }

  const scrollToFeaturedProducts = () => {
    featuredProductsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const renderCarouselSlide = (slide: (typeof sliderData)[0]) => (
    <Carousel.Item key={slide.id}>
      <div
        className="position-relative d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url('${slide.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "78vh",
          overflow: "hidden",
        }}
      >
        <div
          className="position-absolute w-100 h-100"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            top: 0,
            left: 0,
          }}
        ></div>

        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-3 fw-bold mb-4 text-white text-shadow">{slide.title}</h1>
              <h2 className="h2 mb-3 text-warning fw-bold">{slide.subtitle}</h2>
              <p className="lead mb-4 text-white fs-4">{slide.description}</p>
              <Button
                size="lg"
                className="px-5 py-3 fw-bold fs-5 d-inline-flex align-items-center"
                style={{
                  background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                  border: "none",
                  color: "#333",
                  borderRadius: "30px",
                  boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)",
                }}
                onClick={scrollToFeaturedProducts}
              >
                {slide.buttonText} <ArrowRight className="ms-2" size={20} />
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </Carousel.Item>
  )

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null

    const pages = []
    const maxPagesToShow = 5
    const startPage = Math.max(1, pagination.currentPage - Math.floor(maxPagesToShow / 2))
    const endPage = Math.min(pagination.totalPages, startPage + maxPagesToShow - 1)

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Pagination.Item key={i} active={i === pagination.currentPage} onClick={() => handlePageChange(i)}>
          {i}
        </Pagination.Item>,
      )
    }

    return (
      <Pagination className="justify-content-center mt-4">
        <Pagination.First disabled={!pagination.hasPrev} onClick={() => handlePageChange(1)} />
        <Pagination.Prev disabled={!pagination.hasPrev} onClick={() => handlePageChange(pagination.currentPage - 1)} />
        {startPage > 1 && <Pagination.Ellipsis />}
        {pages}
        {endPage < pagination.totalPages && <Pagination.Ellipsis />}
        <Pagination.Next disabled={!pagination.hasNext} onClick={() => handlePageChange(pagination.currentPage + 1)} />
        <Pagination.Last disabled={!pagination.hasNext} onClick={() => handlePageChange(pagination.totalPages)} />
      </Pagination>
    )
  }

  return (
    <div>
      <Carousel className="mb-0" controls={true} indicators={true} interval={4000} pause={false}>
        {sliderData.map(renderCarouselSlide)}
      </Carousel>

      <div
        className="py-3"
        style={{
          background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Container>
          <Row className="text-center text-white">
            <Col md={4} className="mb-3 mb-md-0">
              <div className="d-flex align-items-center justify-content-center">
                <div className="me-3">
                  <RotateCcw size={32} color="#ffd700" />
                </div>
                <div className="text-start">
                  <h6 className="mb-0 fw-bold">Easy Returns</h6>
                  <small className="opacity-75">Hassle-free returns</small>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <div className="d-flex align-items-center justify-content-center">
                <div className="me-3">
                  <Award size={32} color="#ffd700" />
                </div>
                <div className="text-start">
                  <h6 className="mb-0 fw-bold">Top Rated Products</h6>
                  <small className="opacity-75">Quality guaranteed</small>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex align-items-center justify-content-center">
                <div className="me-3">
                  <Truck size={32} color="#ffd700" />
                </div>
                <div className="text-start">
                  <h6 className="mb-0 fw-bold">Cash on Delivery</h6>
                  <small className="opacity-75">Pay when you receive</small>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h2 className="text-center fw-bold mb-3">
              <span className="text-primary">Shop by Category</span>
              <span className="badge bg-danger ms-3 fs-6 pulse-animation">MEGA SALE ON!</span>
            </h2>
            <p className="text-center text-muted">Discover our wide range of home essentials with unbeatable offers</p>
          </Col>
        </Row>
        <Row className="g-4 mb-5">
          <Col md={3} sm={6}>
            <Card
              className="h-100 border-0 shadow-lg category-card position-relative overflow-hidden"
              style={{ cursor: "pointer", transform: "scale(1)", transition: "all 0.3s ease" }}
              onClick={scrollToFeaturedProducts}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)"
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)"
              }}
            >
              <div className="position-absolute top-0 start-0 z-3">
                <span className="badge bg-danger px-3 py-2 rounded-0 rounded-end fw-bold d-flex align-items-center">
                  <Zap size={16} className="me-1" />
                  MAHA DEAL
                </span>
              </div>
              <div className="position-absolute top-0 end-0 z-3">
                <span className="badge bg-warning text-dark px-2 py-1 rounded-0 rounded-start fw-bold">
                  UP TO 70% OFF
                </span>
              </div>
              <div className="position-relative overflow-hidden" style={{ height: "200px" }}>
                <Card.Img variant="top" src="/beautiful-curtains-and-drapes.jpg" className="h-100 object-fit-cover" />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end p-3"
                  style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}
                >
                  <div className="w-100">
                    <h5 className="text-white fw-bold mb-1">Curtains</h5>
                    <small className="text-warning fw-bold">Starting ₹95 | Free Shipping</small>
                  </div>
                </div>
              </div>
              <div className="position-absolute bottom-0 start-0 w-100 bg-primary text-white text-center py-2">
                <small className="fw-bold d-flex align-items-center justify-content-center">
                  <Clock size={14} className="me-1" /> Limited Time Offer!
                </small>
              </div>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card
              className="h-100 border-0 shadow-lg category-card position-relative overflow-hidden"
              style={{ cursor: "pointer", transform: "scale(1)", transition: "all 0.3s ease" }}
              onClick={scrollToFeaturedProducts}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)"
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)"
              }}
            >
              <div className="position-absolute top-0 start-0 z-3">
                <span className="badge bg-success px-3 py-2 rounded-0 rounded-end fw-bold d-flex align-items-center">
                  <Star size={16} className="me-1" />
                  BEST SELLER
                </span>
              </div>
              <div className="position-absolute top-0 end-0 z-3">
                <span className="badge bg-info text-dark px-2 py-1 rounded-0 rounded-start fw-bold">BUY 1 GET 1</span>
              </div>
              <div className="position-relative overflow-hidden" style={{ height: "200px" }}>
                <Card.Img variant="top" src="/modern-furniture-sofa-chair.jpg" className="h-100 object-fit-cover" />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end p-3"
                  style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}
                >
                  <div className="w-100">
                    <h5 className="text-white fw-bold mb-1">Furniture</h5>
                    <small className="text-info fw-bold">Premium Quality | EMI Available</small>
                  </div>
                </div>
              </div>
              <div className="position-absolute bottom-0 start-0 w-100 bg-success text-white text-center py-2">
                <small className="fw-bold">🔥 Trending Now!</small>
              </div>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card
              className="h-100 border-0 shadow-lg category-card position-relative overflow-hidden"
              style={{ cursor: "pointer", transform: "scale(1)", transition: "all 0.3s ease" }}
              onClick={scrollToFeaturedProducts}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)"
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)"
              }}
            >
              <div className="position-absolute top-0 start-0 z-3">
                <span className="badge bg-warning text-dark px-3 py-2 rounded-0 rounded-end fw-bold d-flex align-items-center">
                  <Clock size={16} className="me-1" />
                  FLASH SALE
                </span>
              </div>
              <div className="position-absolute top-0 end-0 z-3">
                <span className="badge bg-danger px-2 py-1 rounded-0 rounded-start fw-bold">SAVE 60%</span>
              </div>
              <div className="position-relative overflow-hidden" style={{ height: "200px" }}>
                <Card.Img variant="top" src="/home-decor-accessories-vases.jpg" className="h-100 object-fit-cover" />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end p-3"
                  style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}
                >
                  <div className="w-100">
                    <h5 className="text-white fw-bold mb-1">Decor</h5>
                    <small className="text-warning fw-bold">Designer Collection | Express Delivery</small>
                  </div>
                </div>
              </div>
              <div className="position-absolute bottom-0 start-0 w-100 bg-warning text-dark text-center py-2">
                <small className="fw-bold">⚡ Ends in 2 Hours!</small>
              </div>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card
              className="h-100 border-0 shadow-lg category-card position-relative overflow-hidden"
              style={{ cursor: "pointer", transform: "scale(1)", transition: "all 0.3s ease" }}
              onClick={scrollToFeaturedProducts}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)"
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)"
              }}
            >
              <div className="position-absolute top-0 start-0 z-3">
                <span className="badge bg-info px-3 py-2 rounded-0 rounded-end fw-bold d-flex align-items-center">
                  <Gift size={16} className="me-1" />
                  NEW ARRIVAL
                </span>
              </div>
              <div className="position-absolute top-0 end-0 z-3">
                <span className="badge bg-success px-2 py-1 rounded-0 rounded-start fw-bold">FLAT 50% OFF</span>
              </div>
              <div className="position-relative overflow-hidden" style={{ height: "200px" }}>
                <Card.Img variant="top" src="/categories/kitchen.png" className="h-100 object-fit-cover" />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end p-3"
                  style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}
                >
                  <div className="w-100">
                    <h5 className="text-white fw-bold mb-1">Kitchen</h5>
                    <small className="text-success fw-bold">Smart Appliances | 2 Year Warranty</small>
                  </div>
                </div>
              </div>
              <div className="position-absolute bottom-0 start-0 w-100 bg-info text-white text-center py-2">
                <small className="fw-bold">🎁 Free Gift Inside!</small>
              </div>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <div
              className="bg-gradient p-4 rounded-3 text-center text-white position-relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
            >
              <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10">
                <div className="d-flex justify-content-around align-items-center h-100">
                  <Zap size={64} />
                  <Star size={64} />
                  <Gift size={64} />
                  <Award size={64} />
                </div>
              </div>
              <div className="position-relative">
                <h3 className="fw-bold mb-2 text-black">🎉 SUPER SAVER COMBO DEALS 🎉</h3>
                <p className="mb-3 text-black">Mix & Match any 3 items from different categories and get additional 25% OFF!</p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <span className="badge bg-warning text-dark px-3 py-2 fs-6">Code: COMBO25</span>
                  <span className="badge bg-success px-3 py-2 fs-6">Free Shipping Above ₹999</span>
                  <span className="badge bg-info px-3 py-2 fs-6">Easy Returns</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="bg-light py-5" ref={featuredProductsRef}>
        <Container>
          <Row>
            {/* Mobile Filter Toggle */}
            <Col xs={12} className="d-lg-none mb-3">
              <Button variant="outline-primary" onClick={() => setShowFilters(!showFilters)} className="w-100">
                <Grid3X3 size={16} className="me-2" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </Col>

            {/* Filters Sidebar */}
            <Col lg={3} className={`${showFilters ? "d-block" : "d-none"} d-lg-block mb-4`}>
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </Col>

            {/* Products */}
            <Col lg={9}>
              {/* Results Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h3 className="mb-1 fw-bold d-flex align-items-center">
                    <Grid3X3 size={24} className="me-2 text-primary" />
                    Featured Products
                  </h3>
                  {!loading && (
                    <p className="text-muted mb-0">
                      Showing {items.length} of {pagination.totalItems} products
                      {filters.category && filters.category !== "all" && <span> in {filters.category}</span>}
                    </p>
                  )}
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-3 text-muted">Loading amazing products...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <Alert variant="danger" className="text-center d-flex align-items-center justify-content-center">
                  <ExclamationTriangle size={20} className="me-2" />
                  {error}
                </Alert>
              )}

              {/* No Products */}
              {!loading && !error && items.length === 0 && (
                <div className="text-center py-5">
                  <Search size={64} className="text-muted mb-3" />
                  <h4 className="mt-3">No products found</h4>
                  <p className="text-muted">Try adjusting your filters or search terms.</p>
                  <Button variant="primary" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Products Grid */}
              {!loading && !error && items.length > 0 && (
                <>
                  <Row className="g-4">
                    {items.map((item) => (
                      <Col key={item._id} xs={12} sm={6} lg={4} xl={3}>
                        <ProductCard item={item} />
                      </Col>
                    ))}
                  </Row>

                  {/* Pagination */}
                  {renderPagination()}
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Home
