export interface WorkflowTask {
  id: string;
  Title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  listId: string;
  createdAt: number;
}
