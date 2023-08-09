export interface Attraction {
  id: number;
  name: string;
  description: string;
  address: string;
  image: string;
  url: string;
  telephone: string;
  city: string;
  openingHours: {
    dayOfWeek: number;
    openTime: string | null;
    closeTime: string | null;
  }[];
}
