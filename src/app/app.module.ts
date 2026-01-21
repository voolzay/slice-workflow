import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent
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



