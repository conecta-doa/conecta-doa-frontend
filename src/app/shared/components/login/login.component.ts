import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MockApiService } from '../../../core/services/mock-api.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  cpfCnpj: string = '';
  password: string = '';

  constructor(private mockApi: MockApiService, private router: Router) {}

  validateCpfCnpj(): string {
    const value = this.cpfCnpj.replace(/\D/g, '');
    if (value.length === 11) {
      return this.isValidCPF(value) ? 'CPF válido' : 'CPF inválido';
    } else if (value.length === 14) {
      return this.isValidCNPJ(value) ? 'CNPJ válido' : 'CNPJ inválido';
    } else {
      return 'Documento incompleto';
    }
  }

  isValidCPF(cpf: string): boolean {
    if (!cpf || cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += Number(cpf.charAt(i)) * (10 - i);
    let firstCheck = (sum * 10) % 11;
    if (firstCheck === 10) firstCheck = 0;
    if (firstCheck !== Number(cpf.charAt(9))) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) sum += Number(cpf.charAt(i)) * (11 - i);
    let secondCheck = (sum * 10) % 11;
    if (secondCheck === 10) secondCheck = 0;
    return secondCheck === Number(cpf.charAt(10));
  }

  isValidCNPJ(cnpj: string): boolean {
    if (!cnpj || cnpj.length !== 14 || /^([0-9])\1+$/.test(cnpj)) return false;
    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    let digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;
    for (let i = length; i >= 1; i--) {
      sum += Number(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== Number(digits.charAt(0))) return false;
    length++;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;
    for (let i = length; i >= 1; i--) {
      sum += Number(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === Number(digits.charAt(1));
  }

  formatCpfCnpj(value: string): string {
    value = value.replace(/\D/g, '');
    value = value.slice(0, 14);
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    } else {
      value = value.replace(/(\d{2})(\d)/, '$1.$2');
      value = value.replace(/(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4');
      value = value.replace(/(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5');
    }
    return value;
  }

  onCpfCnpjInput(event: any): void {
    this.cpfCnpj = this.formatCpfCnpj(event.target.value);
    event.target.value = this.cpfCnpj;
  }

  onSubmit(): void {
    this.mockApi.login(this.cpfCnpj, this.password).subscribe({
      next: (res) => {
        try {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
        } catch (e) {
          // ignore storage errors
        }
        if (res.user?.role === 'donor') {
          this.router.navigate(['/donor']);
        } else if (res.user?.role === 'institution') {
          this.router.navigate(['/instituition']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        alert(err?.message || 'Falha no login');
      },
    });
  }
}
