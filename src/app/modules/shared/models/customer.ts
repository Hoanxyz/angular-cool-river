export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  generateCustomerToken: any;
}
