export interface DropInfo {
  allDay: boolean;
  date: Date;
  dateStr: string;
  draggedEl: HTMLElement;
  jsEvent: () => void;
  resource?: Object;
  view: Object;
}
