import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

interface User {
  name: string;
  age: number;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  users: User[] = [
    { name: 'João', age: 25 },
    { name: 'Maria', age: 30 }
  ];

  newUserName = '';
  newUserAge: number | null = null;

  searchName = '';
  searchAge: number | null = null;

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

  addUser() {
    if (!this.newUserName.trim()) return;
    if (!this.newUserAge || this.newUserAge <= 0) return;

    this.users.push({
      name: this.newUserName,
      age: this.newUserAge
    });

    this.newUserName = '';
    this.newUserAge = null;
  }

  removeUser(userToRemove: User) {
    this.users = this.users.filter(user => user !== userToRemove);
  }
}
