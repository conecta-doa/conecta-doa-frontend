import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-security', 
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent { 

  @Output() voltar = new EventEmitter<void>();
  @Output() avancar = new EventEmitter<any>();

  formSeguranca: FormGroup;
  
  senhaVisivel: boolean = false; 

  constructor(private fb: FormBuilder) {
    this.formSeguranca = this.fb.group({
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmarSenha: ['', Validators.required]
    }, {
      validator: this.mustMatch('senha', 'confirmarSenha')
    });
  }

  onVoltarClick() {
    this.voltar.emit();
  }

  onSubmit() {
    if (this.formSeguranca.valid) {
      this.avancar.emit({ senha: this.formSeguranca.value.senha });
    } else {
      console.log('Formulário inválido. Senhas não coincidem ou são curtas.');
    }
  }
  toggleSenhaVisivel(): void {
    this.senhaVisivel = !this.senhaVisivel;
  }

  private mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) { return; }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}