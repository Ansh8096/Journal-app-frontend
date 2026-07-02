
// Generic Api Response...
export interface ApiResponse <T>{ // 'ApiResponse<T>' This is called a Generic Interface...
    success: boolean;
    message: string;
    data: T;
}

// Generic Api Error...
export interface ApiError{
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;

}   
// Generic Pagination...
export interface Pagination{
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}