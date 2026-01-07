import { Component } from '@angular/core';
import { UsersModule } from './users.module';

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

  searchText = '';

  get filteredUsers(): User[] {
    if (!this.searchText.trim()) {
      return this.users;
    }

    const text = this.searchText.toLowerCase();

    return this.users.filter(user =>
      user.name.toLowerCase().includes(text) ||
      user.age.toString().includes(text)
    );
  }

  newUserName = '';
  newUserAge: number | null = null;

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

  removeUser(index: number) {
    this.users.splice(index, 1);
  }
}
