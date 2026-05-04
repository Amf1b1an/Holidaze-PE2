import { apiRequest } from "../utils/api";
import { Venue } from "../types/index";

export const fetchVenues = () => apiRequest<Venue[]>("/holidaze/venues");

export const fetchVenueById = (id: string) =>
  apiRequest<Venue>(`/holidaze/venues/${id}?_owner=true&_bookings=true`);

export const createVenue = (venueData: any) =>
  apiRequest<Venue>("/holidaze/venues", "POST", venueData);
