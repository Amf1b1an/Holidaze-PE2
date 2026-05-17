import { apiRequest } from "../utils/api";

export async function getProfile(name: string) {
  return await apiRequest<any>(`/holidaze/profiles/${name}`);
}

export async function updateVenueManagerStatus(
  username: string,
  status: boolean,
) {
  return await apiRequest<any>(`/holidaze/profiles/${username}`, {
    method: "PUT",
    body: { venueManager: status },
  });
}
