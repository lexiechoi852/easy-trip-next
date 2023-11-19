export interface Attraction {
  id: number;
  name: string;
  description: string;
  postalCode: string;
  address: string;
  placeId: string;
  latitude: number;
  longitude: number;
  image: string;
  url: string;
  countryCode: string;
  telephone: string;
  city: string;
  openingHours: {
    dayOfWeek: number;
    openTime: string | null;
    closeTime: string | null;
  }[];
}
