import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { HeaderComponent } from './shared/components/header/header';
import { FooterComponent } from './shared/components/footer/footer';
import { Login } from './shared/components/login/login';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { Home } from './components/public-pages/home/home';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, Login, Home ],
  imports: [BrowserModule, CommonModule, FormsModule, RouterModule],
  bootstrap: [],
  exports: [FooterComponent, HeaderComponent],
})
export class AppModule {}
