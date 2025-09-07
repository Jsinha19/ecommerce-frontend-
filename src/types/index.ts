export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Item {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image?: string;
    stock: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
}

export interface CartItem {
    item: Item;
    quantity: number;
    _id: string;
}

export interface Cart {
    _id: string;
    user: string;
    items: CartItem[];
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    user: User;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}

export interface ItemsResponse {
    items: Item[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export interface FilterParams {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    page?: number;
    limit?: number;
}
