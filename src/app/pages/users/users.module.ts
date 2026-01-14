import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  
  
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    UsersRoutingModule,
    DialogModule,
    
  ]
})
export class UsersModule {
 
}



