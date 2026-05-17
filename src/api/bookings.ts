import { apiRequest } from "../utils/api";
import { type Venue } from "../types";

export interface UserBooking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: Venue;
}

export const getUserBookings = async (username: string) => {
  return await apiRequest<UserBooking[]>(
    `/holidaze/profiles/${username}/bookings?_venue=true`,
  );
};

export interface BookingPayload {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}

export async function createBooking(data: BookingPayload) {
  return await apiRequest<any>("/holidaze/bookings", {
    method: "POST",
    body: data,
  });
}

export async function deleteBooking(id: string) {
  return await apiRequest<void>(`/holidaze/bookings/${id}`, {
    method: "DELETE",
  });
}

export async function updateBooking(
  id: string,
  data: Partial<Omit<BookingPayload, "venueId">>,
) {
  return await apiRequest<any>(`/holidaze/bookings/${id}`, {
    method: "PUT",
    body: data,
  });
}
