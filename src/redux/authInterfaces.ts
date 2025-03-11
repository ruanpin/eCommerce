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