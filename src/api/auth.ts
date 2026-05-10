import { apiRequest } from "../utils/api";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: {
    url: string;
    alt?: string;
  };
  banner?: {
    url: string;
    alt?: string;
  };
  venueManager?: boolean;
}

export const registerUser = async (data: RegisterData) => {
  return await apiRequest<any>("/auth/register", "POST", data);
};

export const loginUser = async (loginData: any) => {
  const response = await apiRequest<{
    accessToken: string;
    name: string;
    venueManager: boolean;
    email: string;
    avatar?: { url: string; alt: string };
  }>("/auth/login", "POST", loginData);
  return response;
};
