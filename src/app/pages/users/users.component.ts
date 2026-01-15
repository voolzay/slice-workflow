// =================================================
// # IMPORTS ANGULAR
// =================================================
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

// =================================================
// # IMPORTS PRIMENG
// =================================================
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
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
  selector: 'app-users-dialog-basic-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    DialogModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class UsersComponent implements OnInit {
  // =================================================
  // # DIALOG
  // =================================================
  visible: boolean = false;

  showDialog() {
    this.newUserName = '';
    this.newUserAge = null;
    this.visible = true;
  }

  // =================================================
  // # DADOS
  // =================================================
  users: User[] = [];

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
  // # CARREGAR DADOS DO localStorage
  // =================================================
  ngOnInit() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }
  }

  // =================================================
  // # FILTRO DE USUÁRIOS
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

    this.saveUsersToStorage();

    // limpar campos
    this.newUserName = '';
    this.newUserAge = null;
    this.visible = false;

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Usuário adicionado!'
    });
  }

  // =================================================
  // # REMOVER USUÁRIO
  // =================================================
  confirmRemoveUser(event: Event, user: User) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: 'Confirmação',
      message: `Deseja apagar o usuário ${user.name}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.users = this.users.filter(u => u !== user);
        this.saveUsersToStorage();

        this.messageService.add({
          severity: 'success',
          summary: 'Removido',
          detail: 'Usuário apagado com sucesso'
        });
      }
    });
  }

  // =================================================
  // # EDITAR USUÁRIO
  // =================================================
  userToEdit: User | null = null;
  editDialogVisible: boolean = false;
  editUserName: string = '';
  editUserAge: number | null = null;

  editarUtilizador(user: User) {
    this.userToEdit = user;
    this.editUserName = user.name;
    this.editUserAge = user.age;
    this.editDialogVisible = true;
  }

  guardarEdicao() {
    if (!this.userToEdit) return;

    this.userToEdit.name = this.editUserName;
    this.userToEdit.age = this.editUserAge!;

    this.saveUsersToStorage();

    this.editDialogVisible = false;
    this.userToEdit = null;

    this.messageService.add({
      severity: 'success',
      summary: 'Atualizado',
      detail: 'Usuário editado com sucesso'
    });
  }

  // =================================================
  // # LOCAL STORAGE
  // =================================================
  saveUsersToStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
