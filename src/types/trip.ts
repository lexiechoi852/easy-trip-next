export interface Trip {
  id: string;
  name: string;
  city: string;
  startDate: string;
  endDate: string;
  scheduleItems: CalendarEvent[];
}

export interface ScheduleItem {
  id: number;
  title: string;
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
