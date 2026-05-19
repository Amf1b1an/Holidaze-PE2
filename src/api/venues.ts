import { apiRequest } from "../utils/api";

export interface VenuePayload {
  name: string;
  description: string;
  media: Array<{ url: string; alt: string }>;
  price: number;
  maxGuests: number;
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  location?: {
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
  };
}

export async function createVenue(data: VenuePayload) {
  return await apiRequest<any>("/holidaze/venues", {
    method: "POST",
    body: data,
  });
}

export async function updateVenue(id: string, data: VenuePayload) {
  return await apiRequest<any>(`/holidaze/venues/${id}`, {
    method: "PUT",
    body: data,
  });
}

export async function deleteVenue(id: string) {
  return await apiRequest<any>(`/holidaze/venues/${id}`, {
    method: "DELETE",
  });
}
