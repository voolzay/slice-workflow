import { Component,Input } from '@angular/core';
import { WorkflowMember } from '../../../models/workflow-member.model';
import { trigger } from '@angular/animations';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-list-members',
  templateUrl: './list-members.component.html',
  styleUrls: ['./list-members.component.scss']
})


export class ListMembersComponent {

ShowDialogMember: boolean = false;

addMember(){
this.ShowDialogMember= true;
}

}



