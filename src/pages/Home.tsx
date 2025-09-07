"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { Container, Row, Col, Spinner, Alert, Pagination, Button, Carousel, Card } from "react-bootstrap"
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
                className="px-5 py-3 fw-bold fs-5"
                style={{
                  background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                  border: "none",
                  color: "#333",
                  borderRadius: "30px",
                  boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)",
                }}
                onClick={scrollToFeaturedProducts}
              >
                {slide.buttonText} <i className="bi bi-arrow-right ms-2"></i>
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
                  <i className="bi bi-arrow-repeat" style={{ fontSize: "2rem", color: "#ffd700" }}></i>
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
                  <i className="bi bi-award" style={{ fontSize: "2rem", color: "#ffd700" }}></i>
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
                  <i className="bi bi-truck" style={{ fontSize: "2rem", color: "#ffd700" }}></i>
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
            <h2 className="text-center fw-bold mb-3">Shop by Category</h2>
            <p className="text-center text-muted">Discover our wide range of home essentials</p>
          </Col>
        </Row>
        <Row className="g-4 mb-5">
          <Col md={3} sm={6}>
            <Card
              className="h-100 border-0 shadow-sm category-card"
              style={{ cursor: "pointer" }}
              onClick={scrollToFeaturedProducts}
            >
              <div className="position-relative overflow-hidden" style={{ height: "200px" }}>
                <Card.Img variant="top" src="/beautiful-curtains-and-drapes.jpg" className="h-100 object-fit-cover" />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end p-3"
                  style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}
                >
                  <h5 className="text-white fw-bold mb-0">Curtains</h5>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card
              className="h-100 border-0 shadow-sm category-card"
              style={{ cursor: "pointer" }}
              onClick={scrollToFeaturedProducts}
            >
              <div className="position-relative overflow-hidden" style={{ height: "200px" }}>
                <Card.Img variant="top" src="/modern-furniture-sofa-chair.jpg" className="h-100 object-fit-cover" />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end p-3"
                  style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}
                >
                  <h5 className="text-white fw-bold mb-0">Furniture</h5>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card
              className="h-100 border-0 shadow-sm category-card"
              style={{ cursor: "pointer" }}
              onClick={scrollToFeaturedProducts}
            >
              <div className="position-relative overflow-hidden" style={{ height: "200px" }}>
                <Card.Img variant="top" src="/home-decor-accessories-vases.jpg" className="h-100 object-fit-cover" />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end p-3"
                  style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}
                >
                  <h5 className="text-white fw-bold mb-0">Decor</h5>
                </div>
              </div>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card
              className="h-100 border-0 shadow-sm category-card"
              style={{ cursor: "pointer" }}
              onClick={scrollToFeaturedProducts}
            >
              <div className="position-relative overflow-hidden" style={{ height: "200px" }}>
                <Card.Img variant="top" src="/categories/kitchen.png" className="h-100 object-fit-cover" />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end p-3"
                  style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}
                >
                  <h5 className="text-white fw-bold mb-0">Kitchen</h5>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>

      <div className="bg-light py-5" ref={featuredProductsRef}>
        <Container>
          <Row>
            {/* Mobile Filter Toggle */}
            <Col xs={12} className="d-lg-none mb-3">
              <Button variant="outline-primary" onClick={() => setShowFilters(!showFilters)} className="w-100">
                <i className="bi bi-funnel me-2"></i>
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
                  <h3 className="mb-1 fw-bold">
                    <i className="bi bi-grid me-2 text-primary"></i>
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
                <Alert variant="danger" className="text-center">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </Alert>
              )}

              {/* No Products */}
              {!loading && !error && items.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-search display-1 text-muted"></i>
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
