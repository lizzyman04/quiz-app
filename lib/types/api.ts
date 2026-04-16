/**
 * Standard API response wrapper.
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/**
 * Standard paginated API response wrapper.
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Represents an error returned by the API.
 */
export interface ApiError {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}
