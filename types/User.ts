export default interface User {
  mail: string;
  image?: string;
  name: string;
}
export interface FilteredUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface UserResponse {
  status: string;
  data: {
    user: FilteredUser;
  };
}

export interface UserLoginResponse {
  status: string;
  token: string;
  user: FilteredUser;
}
