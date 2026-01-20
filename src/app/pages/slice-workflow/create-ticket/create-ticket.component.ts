import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WorkflowTicket } from '../../../models/workflow-ticket.model';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.scss'
})
export class CreateTicketComponent implements OnInit {
  @Output() notify = new EventEmitter<WorkflowTicket>();
  
  newTicket: WorkflowTicket = {} as WorkflowTicket; 

  ngOnInit() {

  }

  createTicket() {
    this.notify.emit(this.newTicket);
  }
}
