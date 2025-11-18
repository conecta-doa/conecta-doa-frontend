import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validation', 
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule 
  ],
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent {

  @Input() dadosIniciais: any; 
  @Output() voltar = new EventEmitter<void>();
  @Output() avancar = new EventEmitter<any>();

  formValidacao: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formValidacao = this.fb.group({
      razaoSocial: ['', Validators.required],
      nomeFantasia: [''],
      endereco: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required]
    });
  }

  ngOnInit(): void {    
    if (this.dadosIniciais) {
      this.formValidacao.patchValue(this.dadosIniciais);
    }
  }

  onVoltarClick() {
    this.voltar.emit();
  }

  onSubmit() {
    if (this.formValidacao.valid) {
      this.avancar.emit(this.formValidacao.value);
    } else {
      console.log('Formulário inválido');
    }
  }
}