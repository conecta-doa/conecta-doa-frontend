import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';
import { RouterModule } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [ FooterComponent, HeaderComponent, LoginComponent, CardComponent, UserFormComponent ],
    exports: [ FooterComponent, HeaderComponent, CardComponent, UserFormComponent],
    imports: [ CommonModule, RouterModule, FormsModule ]
})
export class SharedModule {}
