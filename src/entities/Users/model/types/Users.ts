export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: number;
  registration_timestamp?: number;
  photo: string;
}

export interface UsersSchema {
  users: User[];
  isLoading: boolean;
  error?: string;
  nextQuery?: { page: number; count: number };
  shownPage: number;
  count: number;
  offset: number;
}

export interface UsersResponse {
  success: boolean;
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: {
    next_url: string | null;
    prev_url: string | null;
  };
  users: User[];
}
