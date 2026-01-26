import { Injectable } from '@angular/core';
import { WorkflowList } from '../models/workflow-list.model';
 
@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
 
  private readonly STORAGE_KEY = 'workflowLists';
  private readonly ID_KEY = 'workflow_last_id';
 
  constructor() {}
 
  // ============================
  // ID GENERATOR
  // ============================
 
  generateId(): number {
    const lastId = Number(localStorage.getItem(this.ID_KEY)) || 0;
    const newId = lastId + 1;
    localStorage.setItem(this.ID_KEY, newId.toString());
    return newId;
  }
 
  // ============================
  // READ
  // ============================
 
  getLists(): WorkflowList[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? (JSON.parse(data) as WorkflowList[]) : [];
    } catch (error) {
      console.error('Erro ao ler localStorage', error);
      return [];
    }
  }
 
  // ============================
  // SAVE (PRIVATE)
  // ============================
 
  saveLists(lists: WorkflowList[]): void {
    try {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(lists)
      );
    } catch (error) {
      console.error('Erro ao guardar localStorage', error);
    }
  }
 
  // ============================
  // CREATE
  // ============================
 
  addList(list: Omit<WorkflowList, 'Id'>): WorkflowList {
    const lists = this.getLists();
 
    const newList: WorkflowList = {
      ...list,
      Id: this.generateId()
    };
 
    lists.push(newList);
    this.saveLists(lists);
 
    return newList;
  }
 
  // ============================
  // UPDATE
  // ============================
 
  editList(updatedList: WorkflowList): void {
    const lists = this.getLists();
 
    const index = lists.findIndex(l => l.Id === updatedList.Id);
    if (index === -1) return;
 
    lists[index] = {
      ...lists[index],
      Name: updatedList.Name,
      Description: updatedList.Description,
      ProdutoId: updatedList.ProdutoId
    };
 
    this.saveLists(lists);
  }
 
  // ============================
  // DELETE
  // ============================
 
  removeList(id: number): void {
    const lists = this.getLists().filter(l => l.Id !== id);
    this.saveLists(lists);
  }
 
  // ============================
  // CLEAR
  // ============================
 
  clear(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.ID_KEY);
  }
}
 
