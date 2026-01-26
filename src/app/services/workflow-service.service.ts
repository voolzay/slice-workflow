import { Injectable } from '@angular/core';
import { WorkflowList } from '../models/workflow-list.model';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  createList(list: WorkflowList) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  chamaIstoNikita(str: string) {
    localStorage.setItem("nikita", str);
  }

  getLists() {

  }

  saveList() {
    
  }
}
