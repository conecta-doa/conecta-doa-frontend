import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    selector: 'donor-app-root',
    template: '<router-outlet></router-outlet>',
    imports: [RouterOutlet, RouterModule]
})
export class DonorAppComponent {

}
