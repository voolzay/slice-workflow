/*: {
name: string;
tickets:any[];
}[] = [];*/

export interface ListTicketsDto {
  name: string;
  description: string;
  ProdutoId: number;
  tickets: any[]; // или Ticket[]
}
