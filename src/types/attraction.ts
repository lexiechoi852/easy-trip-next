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
    openingHour: string | null;
    closingHour: string | null;
  }[];
}
