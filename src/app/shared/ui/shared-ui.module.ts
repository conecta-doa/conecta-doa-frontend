import { CommonModule } from "@angular/common";
import { AlertComponent } from "./alert/alert.component";
import { ButtonComponent } from "./button/button.component";
import { NgModule } from "@angular/core";


@NgModule({
    declarations: [ ButtonComponent, AlertComponent ],
    exports: [ ButtonComponent, AlertComponent ],
    imports: [ CommonModule ]
})
export class SharedUiModule {}
