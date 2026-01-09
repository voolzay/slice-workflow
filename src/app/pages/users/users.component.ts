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


  searchName: string = '';
  searchAge: number | null = null;

   get filteredUsers() {
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

  removeUser(userToRemove: any) {
    this.users = this.users.filter(user => user !== userToRemove);
  }


}

   

  

