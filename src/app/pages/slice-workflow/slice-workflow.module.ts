import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliceWorkflowRoutingModule } from './slice-workflow-routing.module';
import { SliceWorkflowComponent } from './slice-workflow.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from "primeng/table";
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from "primeng/toast";        // 👈 ОБЯЗАТЕЛЬНО
import { InputTextModule } from 'primeng/inputtext';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { ListMembersComponent } from './list-members/list-members.component';   // 👈 для pInputText




@NgModule({
  declarations: [
    SliceWorkflowComponent,
    CreateTicketComponent,
    EditTicketComponent,
    ListMembersComponent
  ],
  imports: [
    CommonModule,
    SliceWorkflowRoutingModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    TableModule,
    DropdownModule,
    ToastModule
]
  
})
export class SliceWorkflowModule { 

  
}
