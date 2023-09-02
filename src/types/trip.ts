import { Attraction } from "./attraction";

export interface Trip {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  scheduleItems: ScheduleItem[];
}

export interface ScheduleItem {
  name: string;
  description: string;
  attraction: Attraction;
  type: string;
  startTime: Date;
  endTimeTime: Date;
}
