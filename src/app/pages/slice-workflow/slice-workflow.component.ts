import { Component,  } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { OrderListModule } from 'primeng/orderlist';
import { WorkflowList } from '../../models/workflow-list.model';
import { WorkflowTicket } from '../../models/workflow-ticket.model';
import { WorkflowService } from '../../services/workflow.service';
import { ListMembersComponent } from './list-members/list-members.component';


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
ProdutoId:string;
tickets:any[];
}[] = [];


newlistname: string = '';
NewListDescription: string = "";
NewListProd: string = "";
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
    { name: 'SoundCloud', id: 'SoundCloud' },
    { name: 'Spotify', id: 'Spotify' },
    { name: 'Samsung', id: 'Samsung' },
  ];
}



showdialog() {
  this.listDialogvisible = true;
}

addlist(){
  if (!this.newlistname.trim()) return;

  // enviar dados ao mike
  let list = {} as WorkflowList;
  list.Name = this.newlistname.trim();
  list.Description = this.NewListDescription;
  list.ProdutoId = this.NewListProd;

  this.workflowService.setList('workflowLists', [list]);


  this.list.push({
    name: this.newlistname.trim(),
    description: this.NewListDescription,
    ProdutoId: this.NewListProd,
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

createticket(){
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
    ticket.id = 1000;
    alert("Ticket criado com ID " + ticket.id + " e com o titulo " + ticket.Title);
}



/*EDITAR LISTA*/
listToEdit: any | null = null;      
editDialogVisible: boolean = false;

editlistname: string = '';
editlistdesc: string = '';

// открытие диалога редактирования списка
editList(list: any) {
  this.listToEdit = list;
  this.editlistname = list.name;
  this.editlistdesc = list.description;
  this.editDialogVisible = true;
}

// сохранение изменений
saveEdit() {
  if (!this.listToEdit) return;

  this.listToEdit.name = this.editlistname;
  this.listToEdit.description = this.editlistdesc;

  this.editDialogVisible = false;
  this.listToEdit = null;
}

// Для удаления
showdialogRemoveVisible: boolean = false;
listToRemove: any | null = null; 

// Вызывается при нажатии кнопки DELETR
confirmRemoveList(list: any) {
  this.listToRemove = list;
  this.showdialogRemoveVisible = true;
}

// Удаляем список
removeList() {
  if (!this.listToRemove) return;

  this.list = this.list.filter(list => list !== this.listToRemove);

  this.showdialogRemoveVisible = false;
  this.listToRemove = null;
}


}



