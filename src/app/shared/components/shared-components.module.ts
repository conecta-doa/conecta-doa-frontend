import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';
import { Card } from './card/card';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Home } from '../../components/public-pages/home/home';

@NgModule({
  declarations: [Login, HeaderComponent, FooterComponent, Card, Home],
  exports: [HeaderComponent, FooterComponent, Login, Card, FormsModule, RouterModule],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class SharedModule {}
