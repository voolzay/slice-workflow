export interface WorkflowTicket {
  id: number;
  Title: string; 
  name: string;
  status: 'TO DO' | 'IN PROGRESS' | 'DONE';
}