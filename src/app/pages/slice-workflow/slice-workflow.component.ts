import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { WorkflowList } from '../../models/workflow-list.model';
import { WorkflowTicket } from '../../models/workflow-ticket.model';
import { WorkflowService } from '../../services/workflow.service';

@Component({
  selector: 'app-slice-workflow',
  templateUrl: './slice-workflow.component.html',
  styleUrls: ['./slice-workflow.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class SliceWorkflowComponent implements OnInit {

  // Dropdown дані
  cities: { name: string; code: string; color?: string }[] = [];
  selectedCity: { name: string; code: string; color?: string } | null = null;

  products: { name: string; id: string }[] = [];
  selectedProduct: { name: string; id: string } | null = null;

  // Діалоги
  listDialogvisible: boolean = false;
  ticketDialogvisible: boolean = false;
  editdialogvisible: boolean = false;

  selectedlist: WorkflowList | null = null;
  list: WorkflowList[] = [];

  // Поля форми
  newlistname: string = '';
  NewListDescription: string = '';
  NewListProd: string = '';
  newticketname: string = '';

  constructor(private workflowService: WorkflowService) {}

  ngOnInit() {
    // Статуси для dropdown
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

    // Завантаження списків з localStorage
    // tickets завжди масив, навіть якщо undefined
    this.list = this.workflowService.getLists().map(list => ({
      ...list,
      tickets: list.tickets || []
    }));
  }

  // --------------------------
  // Списки
  // --------------------------
  showdialog() {
    this.listDialogvisible = true;
  }

  addlist() {
    if (!this.newlistname.trim()) return;

    const newList: Omit<WorkflowList, 'Id'> = {
      name: this.newlistname.trim(),
      description: this.NewListDescription,
      ProdutoId: this.NewListProd,
      tickets: [] // завжди масив
    };

    const savedList = this.workflowService.addList(newList);
    this.list.push(savedList);

    // очищення полів
    this.newlistname = '';
    this.NewListDescription = '';
    this.NewListProd = '';
    this.listDialogvisible = false;
  }

  showdialogticket(list: WorkflowList) {
    this.selectedlist = list;
    this.ticketDialogvisible = true;
  }

  // --------------------------
  // Тикети
  // --------------------------
  createticket() {
    if (!this.newticketname.trim() || !this.selectedlist) return;

    if (!this.selectedlist.tickets) {
      this.selectedlist.tickets = [];
    }

    const newTicket: WorkflowTicket = {
      id: this.generateTicketId(),
      Title: this.newticketname.trim(),
      name: this.newticketname.trim(),
      status: "TO DO"
    };

    this.selectedlist.tickets.push(newTicket);

    // Зберігаємо оновлений список у localStorage через сервіс
    this.workflowService.editList(this.selectedlist);

    // очищення полів
    this.newticketname = '';
    this.ticketDialogvisible = false;
  }

  // --------------------------
  // Генерація унікального id для тикета
  // --------------------------
  generateTicketId(): number {
    return Math.floor(Math.random() * 1000000);
  }
}
