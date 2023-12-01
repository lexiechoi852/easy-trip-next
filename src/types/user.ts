export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginSuccessResponse {
  user: User;
  message: string;
  accessToken: string;
  success: boolean;
}
