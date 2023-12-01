import { Attraction } from "./attraction";

export interface Trip {
  id: number;
  name: string;
  city: string;
  startDate: string;
  endDate: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  image: string;
  start: string;
  end: string;
  overlap: boolean;
  latitude: number;
  longitude: number;
}

export interface TripItem {
  id: number;
  start: string;
  end: string;
  overlap: boolean;
  attraction: Attraction;
}

export interface ScheduleItem {
  id: number;
  attractionId: number;
  tripId: number;
  name: string;
  latitude: number;
  longitude: number;
}
