import { WorkflowTicket } from "./workflow-ticket.model";
 
export interface WorkflowList {
  Name: string;
  Description: string;
  ProdutoId: string;
  Id: number;
  tickets?: WorkflowTicket[];
 
}
