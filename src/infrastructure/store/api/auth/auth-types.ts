export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    profilePicture: string | null;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isVerified: boolean;
    isLocked: boolean;
    role: string;
    claims: string[];
  };
  roles: string[];
}
