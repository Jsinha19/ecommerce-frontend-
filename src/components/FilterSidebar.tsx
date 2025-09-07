import React from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { FilterParams } from '../types';

interface FilterSidebarProps {
    filters: FilterParams;
    onFilterChange: (filters: FilterParams) => void;
    onClearFilters: () => void;
}

const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'books', label: 'Books' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports' },
    { value: 'beauty', label: 'Beauty' },
];

const FilterSidebar: React.FC<FilterSidebarProps> = ({
    filters,
    onFilterChange,
    onClearFilters
}) => {
    const handleInputChange = (key: keyof FilterParams, value: any) => {
        onFilterChange({
            ...filters,
            [key]: value,
            page: 1, // Reset to first page when filters change
        });
    };

    return (
        <Card className="filter-sidebar sticky-top" style={{ top: '80px', zIndex: 0}}>
            <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">
                        <i className="bi bi-funnel me-2"></i>
                        Filters
                    </h6>
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={onClearFilters}
                    >
                        Clear
                    </Button>
                </div>
            </Card.Header>
            <Card.Body>
                {/* Search */}
                <Form.Group className="mb-3">
                    <Form.Label>Search Products</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Search by name or description..."
                        value={filters.search || ''}
                        onChange={(e) => handleInputChange('search', e.target.value)}
                    />
                </Form.Group>

                {/* Category Filter */}
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                        value={filters.category || 'all'}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                    >
                        {categories.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {/* Price Range */}
                <Form.Group className="mb-3">
                    <Form.Label>Price Range</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control
                                type="number"
                                placeholder="Min Price"
                                value={filters.minPrice || ''}
                                onChange={(e) => handleInputChange('minPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="number"
                                placeholder="Max Price"
                                value={filters.maxPrice || ''}
                                onChange={(e) => handleInputChange('maxPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                {/* Quick Price Filters */}
                <Form.Group className="mb-3">
                    <Form.Label>Quick Price Filters</Form.Label>
                    <div className="d-grid gap-2">
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleInputChange('maxPrice', 50)}
                        >
                            Under $50
                        </Button>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => {
                                handleInputChange('minPrice', 50);
                                handleInputChange('maxPrice', 200);
                            }}
                        >
                            $50 - $200
                        </Button>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => {
                                handleInputChange('minPrice', 200);
                                handleInputChange('maxPrice', 500);
                            }}
                        >
                            $200 - $500
                        </Button>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleInputChange('minPrice', 500)}
                        >
                            Over $500
                        </Button>
                    </div>
                </Form.Group>
            </Card.Body>
        </Card>
    );
};

export default FilterSidebar;
