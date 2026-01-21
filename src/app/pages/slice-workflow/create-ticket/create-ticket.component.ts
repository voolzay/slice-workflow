import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WorkflowTicket } from '../../../models/workflow-ticket.model';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.scss'
})
export class CreateTicketComponent implements OnInit {
receiveTicketCreated($event: WorkflowTicket) {
throw new Error('Method not implemented.');
}

listDialogvisible: boolean = false;
ticketDialogvisible: boolean = false;
selectedlist: any = null;

list: {
name: string;
description: string;
product:string;
tickets:any[];
}[] = [];


newlistname: string = '';
NewListDescription: string = "";
NewListProd: string = "";
editdialogvisible: any;
newticketname: string = '';

  @Output() notify = new EventEmitter<WorkflowTicket>();
  newTicket: WorkflowTicket = {} as WorkflowTicket; 

  ngOnInit() {

  }

  showdialogticket(list : any){
  this.selectedlist= list;
  this.ticketDialogvisible = true;
}



  createTicket() {
     if (!this.newticketname.trim() || !this.selectedlist!) return;
 this.selectedlist.tickets.push({
  name:this.newticketname.trim(),
  status: ""

  
 });





 this.newticketname = "";
 this.NewListDescription = "";
 this.ticketDialogvisible = false;

  }
}
