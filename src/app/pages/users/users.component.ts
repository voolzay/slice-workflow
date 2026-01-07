import { Component } from '@angular/core';

interface User {
  name: string;
  age: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  users: User[] = [
    { name: 'João', age: 25 },
    { name: 'Maria', age: 30 }
  ];

  newUserName = '';
  newUserAge: number | null = null;

  addUser() {
    if (!this.newUserName.trim()) return;
    if (this.newUserAge === null || this.newUserAge <= 0) return;

    this.users.push({
      name: this.newUserName,
      age: this.newUserAge
    });

    this.newUserName = '';
    this.newUserAge = null;
  }

  removeUser(index: number) {
    this.users.splice(index, 1);
  }
}
