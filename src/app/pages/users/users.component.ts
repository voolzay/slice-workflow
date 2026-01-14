// =================================================
// # IMPORTS ANGULAR
// =================================================
import { Component } from '@angular/core';
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
  selector: 'app-users dialog-basic-demo',
  
  standalone: true,

  // ---------- módulos usados neste componente ----------
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    DialogModule,
    DialogModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],

  // ---------- serviços do PrimeNG ----------
  providers: [ConfirmationService, MessageService]
})
// =================================================
// # DIALOG
// =================================================
export class UsersComponent {
  visible: boolean = false;

  showDialog() {
    this.newUserName = '';
    this.newUserAge = null;
    this.visible = true;
  }
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
      acceptLabel: 'Sim',
      rejectLabel: 'Cancelar',
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
      
// Variáveis para controlar a edição e dialog
userToEdit: any = null;
editDialogVisible: boolean = false;
editUserName: string = '';
editUserAge: number | null = null;

// Função para abrir o diálogo e preencher os campos
editarUtilizador(user: any) {
  this.userToEdit = user;
  this.editUserName = user.name;
  this.editUserAge = user.age;
  this.editDialogVisible = true;
}

// Função para guardar as alterações
guardarEdicao() {
  if (!this.userToEdit) return;

  this.userToEdit.name = this.editUserName;
  this.userToEdit.age = this.editUserAge;

  this.editDialogVisible = false;
  this.userToEdit = null;

  // Opcional: Se tiveres função para atualizar filtros ou lista, chama aqui
  // this.atualizarListaUsuarios();
}

}

