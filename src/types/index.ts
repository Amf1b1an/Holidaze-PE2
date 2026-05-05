// media
export interface Media {
  url: string;
  alt: string;
}

// meta
export interface VenueMeta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

// locatio
export interface VenueLocation {
  address: string | null;
  city: string | null;
  zip: string | null;
  country: string | null;
  continent: string | null;
  lat: number;
  lng: number;
}

// venue manager
export interface VenueOwner {
  name: string;
  email: string;
  bio: string | null;
  avatar: Media;
  banner: Media;
}

// booking
export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
}

// main venue
export interface Venue {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: VenueMeta;
  location: VenueLocation;
  owner?: VenueOwner;
  bookings?: Booking[];
}

// auth
export interface User {
  name: string;
  email: string;
  bio?: string;
  avatar?: Media;
  banner?: Media;
  venueManager: boolean;
}
