export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

export interface ApiResponse<T> {
  data: T;
  page: number;
  per_page: number;
  support: any;
  total: number;
  total_pages: number;
}
