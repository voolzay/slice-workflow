import { WorkflowTicket } from "./workflow-ticket.model";

export interface WorkflowList {
  name: string;
  description: string;
  ProdutoId: string;
  Id: number;
  tickets?: WorkflowTicket[];
 
 
}
