import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-slice-workflow',
  templateUrl: './slice-workflow.component.html',
  styleUrls: ['./slice-workflow.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class SliceWorkflowComponent {

  visible: boolean = false;

  lists: { name: string }[] = [];   
  newlistname: string = '';
  newlistdescription: string = '';
  newlistprod : string = '';
  editDialogVisible: any;

  constructor(private messageService: MessageService) {}

  showdialog() {
    this.visible = true;

    this.messageService.add({
      severity: 'info',
      summary: 'List',
      detail: 'You can add a new list'
    });
  }

  addlist() {   
    if (!this.newlistname.trim()) return;
    this.lists.push({ name: this.newlistname.trim() });

    this.newlistname = '';
    this.newlistdescription = '';
    this.newlistprod = '';
    this.visible = false;
    
    


    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'List added successfully'
    });
  }
}
