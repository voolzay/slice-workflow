import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  constructor() { }

  chamaIstoNikita(str: string) {
    localStorage.setItem("nikita", str);
  }

  getLists() {

  }

  saveList() {
    
  }
}
