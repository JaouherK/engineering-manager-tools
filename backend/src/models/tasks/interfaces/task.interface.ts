export interface ITask {
  position: number;
  title: string;
  notes: null | string;
  dueDate: null | Date;
  userId: string;
  status: string;
  isGenerated: boolean;
  links: string;
}
