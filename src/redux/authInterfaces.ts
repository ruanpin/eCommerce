export interface LoginResponse {
    message: string;
    token?: string;
    user?: {
      id: number;
      email: string;
      name: string;
    };
    status: number;
}

export interface UserRegister {
  name: string,
  email: string,
  password: string,
  role: string
}

export interface UserDetails {
  id: number,
  email: string,
  name: string,
  phone: string | null,
  address: string | null,
  role: string
}