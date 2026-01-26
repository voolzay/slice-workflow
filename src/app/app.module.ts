import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ButtonModule } from 'primeng/button';
import { TaskCreateComponent } from './pages/slice-workflow/task-create/task-create.component';
import { TaskEditComponent } from './pages/slice-workflow/task-edit/task-edit.component';
// app.config.ts або app.module.ts
import { provideAnimations } from '@angular/platform-browser/animations';

providers: [provideAnimations()]

@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
imports: [
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  BrowserAnimationsModule,
  DialogModule,
  ButtonModule
],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}



