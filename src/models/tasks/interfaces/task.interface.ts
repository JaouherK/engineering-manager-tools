export interface ITask {
  position: number;
  title: string;
  notes: null | string;
  due_date: null | Date;
  userId: string;
  status: string;
  is_generated: boolean;
  links: string;
}
