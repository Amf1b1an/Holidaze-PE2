import { apiRequest } from "../utils/api";

export async function getProfile(name: string) {
  return await apiRequest<any>(`/holidaze/profiles/${name}`, "GET");
}

export async function updateVenueManagerStatus(
  username: string,
  status: boolean,
) {
  return await apiRequest<any>(`/holidaze/profiles/${username}`, "PUT", {
    venueManager: status,
  });
}
