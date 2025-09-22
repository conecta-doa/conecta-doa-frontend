import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';
import { Card } from './card/card';


@NgModule({
    declarations: [ Login, HeaderComponent, FooterComponent, Card ],
    exports: [],
    imports: [CommonModule]
})
export class DonorModule {}
