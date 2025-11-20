import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InstitutionData } from '../../../core/services/institution.service';
import { DonationContextService } from '../../../core/services/donation-context.service';

@Component({
  selector: 'app-donor-donation',
  standalone: false,
  templateUrl: './donor-donation.component.html',
  styleUrls: ['./donor-donation.component.css'],
})
export class DonorDonationComponent implements OnInit {
  currentScreen: 'screen1' | 'screen2' | 'screen3' = 'screen1';
  currentDonationType: 'financeira' | 'alimentos' | 'roupas' = 'financeira';
  currentPaymentMethod: 'pix' | 'credit' = 'pix';
  currentValue: string = '50';

  showCustomValue: boolean = false;
  customValue: string = 'R$ 0,00';

  foodType: 'nao-perecivel' | 'perecivel' = 'nao-perecivel';
  foodQuantity: string = '';
  specialConditions: string = '';
  safetyGuidelinesAccepted: boolean = false;
  deliveryOption: 'coleta' | 'pontos' = 'coleta';

  cardNumber: string = '';
  cardExpiry: string = '';
  cardCvv: string = '';
  cardName: string = '';
  cardCpf: string = '';

  institutionName: string = 'Mãos que Ajudam';

  selectDonationType(type: 'financeira' | 'alimentos' | 'roupas'): void {
    this.currentDonationType = type;
  }

  selectValue(value: string): void {
    this.currentValue = value;
    this.showCustomValue = false;
  }

  showCustomValueInput(): void {
    this.showCustomValue = true;
    this.customValue = '';
  }

  onCustomValueInput(): void {
    let value = this.customValue.replace(/\D/g, '');

    if (value === '') {
      this.customValue = 'R$ 0,00';
      this.currentValue = '0';
      return;
    }

    const numericValue = parseInt(value) / 100;
    const formattedValue = numericValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    this.customValue = `R$ ${formattedValue}`;
    this.currentValue = formattedValue.replace('.', '').replace(',', '.');
  }

  onCustomValueFocus(): void {
    if (this.customValue === 'R$ 0,00' || this.customValue === '') {
      this.customValue = '';
    }
  }

  onCustomValueBlur(): void {
    if (this.customValue === '' || this.customValue === 'R$ ') {
      this.customValue = 'R$ 0,00';
      this.currentValue = '0';
    }
  }

  selectPaymentMethod(method: 'pix' | 'credit'): void {
    this.currentPaymentMethod = method;
  }

  selectFoodType(type: 'nao-perecivel' | 'perecivel'): void {
    this.foodType = type;
  }

  selectDeliveryOption(option: 'coleta' | 'pontos'): void {
    this.deliveryOption = option;
  }

  confirmFinancialDonation(): void {
    this.currentScreen = 'screen2';
  }

  confirmFoodDonation(): void {
    if (!this.safetyGuidelinesAccepted) {
      alert('Por favor, confirme que leu e concorda com as Diretrizes de Segurança e Higiene.');
      return;
    }
    this.currentScreen = 'screen3';
  }

  finalizeDonation(): void {
    // Ao finalizar, navega para a tela de confirmação
    // Poderíamos salvar dados no DonationContextService se necessário
    this.router.navigate(['/donor/donation/confirmed']);
  }

  backToStart(): void {
    this.currentScreen = 'screen1';
    this.safetyGuidelinesAccepted = false;
    this.foodQuantity = '';
    this.specialConditions = '';
  }

  formatForDisplay(value: string): string {
    const numericValue = parseFloat(value);
    return numericValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  formatCardNumber(): void {
    let numbers = this.cardNumber.replace(/\D/g, '');

    numbers = numbers.substring(0, 16);

    const formatted = numbers.replace(/(\d{4})(?=\d)/g, '$1 ');
    this.cardNumber = formatted;
  }

  formatCardExpiry(): void {
    let numbers = this.cardExpiry.replace(/\D/g, '');

    numbers = numbers.substring(0, 4);

    if (numbers.length >= 2) {
      const month = numbers.substring(0, 2);
      const year = numbers.substring(2, 4);
      this.cardExpiry = `${month}/${year}`;
    } else {
      this.cardExpiry = numbers;
    }
  }

  formatCardCvv(): void {
    this.cardCvv = this.cardCvv.replace(/\D/g, '').substring(0, 4);
  }

  formatCpf(): void {
    let numbers = this.cardCpf.replace(/\D/g, '');

    numbers = numbers.substring(0, 11);

    if (numbers.length <= 3) {
      this.cardCpf = numbers;
    } else if (numbers.length <= 6) {
      this.cardCpf = numbers.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    } else if (numbers.length <= 9) {
      this.cardCpf = numbers.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else {
      this.cardCpf = numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    }
  }

  constructor(private router: Router, private donationContext: DonationContextService) {}

  ngOnInit(): void {
    // Try to read institution from navigation state (works on navigation)
    const navState = this.router.getCurrentNavigation()?.extras?.state as
      | { institution?: InstitutionData }
      | undefined;

    // Fallback to history.state (works also on reload/navigation from external link)
    const histState =
      (window && (window.history as any) && (window.history as any).state) || undefined;

    const state = navState || histState;

    if (state && (state as any).institution) {
      const inst = (state as any).institution as InstitutionData;
      if (inst && inst.name) {
        this.institutionName = inst.name;
      }
    } else {
      // Fallback: check DonationContextService for a saved institution (e.g. after login)
      const saved = this.donationContext.getSelectedInstitution();
      if (saved && saved.name) {
        this.institutionName = saved.name;
        // Optionally clear the context so it doesn't leak to other flows
        this.donationContext.clear();
      }
    }
  }
}
