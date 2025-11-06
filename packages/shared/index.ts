// ============================================
// TYPES
// ============================================

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  limit: number;
  totalItems: number;
  hasPrev: boolean;
  hasNext: boolean;
}

// ============================================
// CONSTANTS
// ============================================

export const PAGINATE_DEFAULT_LIMIT = 20;
export const MAX_PASSWORD_LENGTH = 128;
