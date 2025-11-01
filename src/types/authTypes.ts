export interface Credentials {
  email: string;
  password: string;
}

export interface SignupData extends Credentials {
  first_name: string;
  last_name: string;
  password_confirm: string;
}

export interface GoogleLoginData {
  access_token: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    date_joined: string;
    is_active: boolean;
    provider?: "google" | "credentials";
    phone_number?: string;
    pass_active?: boolean;
  };
}
