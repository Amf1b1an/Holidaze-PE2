import { apiRequest } from "../utils/api";

export async function getProfile(name: string) {
  return await apiRequest<any>(`/holidaze/profiles/${name}`, "GET");
}
