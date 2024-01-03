export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  generateCustomerToken: any;
}

export interface ICreateCustomer {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  is_subscribed: boolean;
}
