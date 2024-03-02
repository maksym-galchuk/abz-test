export interface Position {
  id: number;
  name: string;
}

export interface SignUpErrors {
  name?: string;
  email?: string;
  phone?: string;
  photo?: string;
  positions?: string;
  global?: string;
}

export interface SignUpSchema {
  name: string;
  email: string;
  phone: string;
  selectedPosition: Position;
  positions: Position[];
  photo: { name: string; blobUrl: string };
  errors: SignUpErrors;
  isLoading: boolean;
  done: boolean;
}
