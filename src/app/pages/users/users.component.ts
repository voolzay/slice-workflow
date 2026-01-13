// =================================================
// # IMPORTS ANGULAR
// =================================================
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// =================================================
// # IMPORTS PRIMENG
// =================================================
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { ConfirmationService, MessageService } from 'primeng/api';

// =================================================
// # INTERFACE
// =================================================
interface User {
  name: string;
  age: number;
}

// =================================================
// # COMPONENT
// =================================================
@Component({
  selector: 'app-users',
  standalone: true,

  // ---------- módulos usados neste componente ----------
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule
  ],

  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],

  // ---------- serviços do PrimeNG ----------
  providers: [ConfirmationService, MessageService]
})
export class UsersComponent {

  // =================================================
  // # DADOS
  // =================================================
  users: User[] = [
    { name: 'João', age: 25 },
    { name: 'Maria', age: 30 }
  ];

  // =================================================
  // # FORMULÁRIO (ADICIONAR USUÁRIO)
  // =================================================
  newUserName = '';
  newUserAge: number | null = null;

  // =================================================
  // # FILTROS DE PESQUISA
  // =================================================
  searchName = '';
  searchAge: number | null = null;

  // =================================================
  // # CONSTRUTOR (SERVIÇOS)
  // =================================================
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  // =================================================
  // # USUÁRIOS FILTRADOS (nome + idade)
  // =================================================
  get filteredUsers(): User[] {
    return this.users.filter(user => {
      const byName = this.searchName
        ? user.name.toLowerCase().includes(this.searchName.toLowerCase())
        : true;

      const byAge = this.searchAge !== null
        ? user.age === this.searchAge
        : true;

      return byName && byAge;
    });
  }

  // =================================================
  // # ADICIONAR USUÁRIO
  // =================================================
  addUser() {
    if (!this.newUserName.trim()) return;
    if (!this.newUserAge || this.newUserAge <= 0) return;

    this.users.push({
      name: this.newUserName,
      age: this.newUserAge
    });

    // limpar campos
    this.newUserName = '';
    this.newUserAge = null;
  }

  // =================================================
  // # CONFIRMAR REMOÇÃO DE USUÁRIO
  // =================================================

  
  confirmRemoveUser(event: Event, user: User) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: 'Confirmação',
      message: `Deseja apagar o usuário ${user.name}?`,
      icon: 'pi pi-exclamation-triangle',
      

     //
      acceptLabel: 'Sim ',
      rejectLabel: 'Cancelar',
    acceptButtonStyleClass: 'btn-accept-custom',
    rejectButtonStyleClass: 'btn-reject-custom',
     //
      

      // ---------- ação ao confirmar ----------
      accept: () => {
        this.users = this.users.filter(u => u !== user);

        this.messageService.add({
          
          severity: 'success',
          summary: 'Removido',
          detail: 'Usuário apagado com sucesso'
          
        });
      }
    });
  }
}
