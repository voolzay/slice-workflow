import { Component,  } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { OrderListModule } from 'primeng/orderlist';
import { WorkflowList } from '../../models/workflow-list.model';
import { WorkflowTicket } from '../../models/workflow-ticket.model';
import { WorkflowService } from '../../services/workflow-service.service';


@Component({
  selector: 'app-slice-workflow',
  templateUrl: './slice-workflow.component.html',
  styleUrls: ['./slice-workflow.component.scss'],
  providers: [ConfirmationService, MessageService, DropdownModule,OrderListModule]
})
export class SliceWorkflowComponent {

cities: any[] = [];
selectedCity: any;

products: any[] = [];
selectedProduct: any;


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

constructor(private workflowService: WorkflowService) {

}

ngOnInit() {
  this.cities = [
    { name: 'IN PROGRESS', code: 'NY', color: '#f0ad4e' },
    { name: 'TO DO', code: 'RM' },
    { name: 'DONE', code: 'LDN' },
  ];

  this.products = [
    { name: 'SoundCloud', id: '#f0ad4e' },
    { name: 'Spotify', id: 'RM' },
    { name: 'Samsung', id: 'LDN' },
  ];
}



showdialog() {
  this.listDialogvisible = true;
}

addlist(){
  if (!this.newlistname.trim()) return;
  this.list.push({
    name: this.newlistname.trim(),
    description: this.NewListDescription,
    product: this.NewListProd,
    tickets: [],
  });
  

  this.newlistname = ""
  this.NewListDescription = ""
  this.listDialogvisible = false;
}

showdialogticket(list : any){
  this.selectedlist= list;
  this.ticketDialogvisible = true;
}

addticket(){
 if (!this.newticketname.trim() || !this.selectedlist!) return;
 this.selectedlist.tickets.push({
  name:this.newticketname.trim(),
  status: ""

  
 });

 this.newticketname = "";
 this.NewListDescription = "";
 this.ticketDialogvisible = false;

}

receiveTicketCreated(ticket: WorkflowTicket)
{
    ticket.Id = 1000;
    alert("Ticket criado com ID " + ticket.Id + " e com o titulo " + ticket.Title);
}

teste() {
  this.workflowService.chamaIstoNikita("abc");
}

}




