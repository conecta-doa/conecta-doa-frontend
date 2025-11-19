
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';


import { UserFormComponent } from './user-form/user-form.component';

import { InstituitinListComponent } from './instituitin-list.component/instituitin-list.component';


@NgModule({
  declarations: [HeaderComponent, LoginComponent, CardComponent, UserFormComponent],
  exports: [
    FooterComponent,
    HeaderComponent,
    CardComponent,
    UserFormComponent,
    InstituitinListComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, FooterComponent, InstituitinListComponent],
})
export class SharedModule {}
