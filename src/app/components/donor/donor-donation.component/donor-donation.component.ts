import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InstitutionData } from '../../../core/services/institution.service';
import { DonationContextService } from '../../../core/services/donation-context.service';
import { DonationService } from '../../../core/services/donation.service';
import { MockApiService } from '../../../core/services/mock-api.service';
import { PixService } from '../../../core/services/pix.service';

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

  pixImage: string | null = null;
  pixCopyPaste: string | null = null;
  pixLoading: boolean = false;

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

    if (this.currentPaymentMethod === 'pix') {
      this.generatePixForCurrentDonation();
    }
  }

  private generatePixForCurrentDonation(): void {
    const value = parseFloat(this.currentValue) || 0;
    if (value <= 0) return;

    const selected = this.donationContext.getSelectedInstitution();
    const name = (selected && (selected as any).name) || this.institutionName || '';
    const location = (selected && (selected as any).location) || '';
    const city = (location && location.split(',')[0]) || 'São Paulo';

    this.pixLoading = true;
    this.pixImage = null;
    this.pixCopyPaste = null;

    this.pixService.generatePix(value, name, city).subscribe({
      next: (res) => {
        this.pixLoading = false;
        if (res && res.isSuccess) {
          this.pixCopyPaste = res.copyPaste || null;
          this.pixImage = res.qrCode ? `data:image/png;base64,${res.qrCode}` : null;
        } else {
          alert('Falha ao gerar QR Pix: ' + (res?.error || 'Resposta inválida'));
        }
      },
      error: (err) => {
        this.pixLoading = false;
        console.error('Erro gerando Pix', err);
        alert('Erro ao gerar QR Pix. Veja o console para detalhes.');
      },
    });
  }

  copyPixToClipboard(): void {
    if (!this.pixCopyPaste) return;
    try {
      navigator.clipboard.writeText(this.pixCopyPaste);
      alert('Texto Pix copiado para a área de transferência');
    } catch (e) {
      console.error('Erro copiando para clipboard', e);
      alert('Não foi possível copiar automaticamente. Selecione e copie manualmente.');
    }
  }

  confirmFoodDonation(): void {
    if (!this.safetyGuidelinesAccepted) {
      alert('Por favor, confirme que leu e concorda com as Diretrizes de Segurança e Higiene.');
      return;
    }
    this.currentScreen = 'screen3';
  }

  finalizeDonation(): void {
    let donation: any = {
      type: this.currentDonationType === 'financeira' ? 'monetary' : 'in-kind',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    if (this.currentDonationType === 'financeira') {
      donation.amount = parseFloat(this.currentValue) || 0;
      donation.currency = 'BRL';
    } else if (this.currentDonationType === 'alimentos') {
      const qty = parseInt(this.foodQuantity || '1') || 1;
      donation.items = [{ name: 'Alimentos', quantity: qty, unit: 'un' }];
      donation.pickup = { date: new Date().toISOString() };
    } else if (this.currentDonationType === 'roupas') {
      donation.items = [{ name: 'Roupas', quantity: 1, unit: 'un' }];
    }
    const selected = this.donationContext.getSelectedInstitution();
    if (selected && (selected as any).name) {
      donation.institutionName = (selected as any).name;
    } else {
      donation.institutionName = this.institutionName;
    }

    let rawUser: any = null;
    try {
      rawUser = JSON.parse(localStorage.getItem('user') || 'null');
    } catch (e) {
      rawUser = null;
    }

    if (!rawUser || !rawUser.id) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/donor/donation' } });
      return;
    }

    const userId = rawUser.id as string;

    this.mockApi.getDonors().subscribe({
      next: (donors: any[]) => {
        const donor = (donors || []).find((d: any) => d.userId === userId);
        if (!donor) {
          alert('Não foi possível localizar seu perfil de doador.');
          return;
        }

        donation.donorId = donor.id;

        let pointsToAdd = 0;
        if (donation.type === 'monetary') {
          pointsToAdd = Math.max(1, Math.round(donation.amount));
        } else if (donation.items && donation.items.length) {
          const totalQty = donation.items.reduce(
            (s: number, it: any) => s + (Number(it.quantity) || 0),
            0
          );
          pointsToAdd = Math.max(1, totalQty * 5);
        }

        this.mockApi.getInstitutions().subscribe({
          next: (insts: any[]) => {
            const found = (insts || []).find(
              (i: any) => i.name === donation.institutionName || i.slug === donation.institutionName
            );
            if (found && found.id) donation.institutionId = found.id;

            this.donationService.create(donation, donor.id, pointsToAdd).subscribe({
              next: (res: any) => {
                try {
                  this.donationContext.clear();
                } catch {}
                const navState: any = {
                  donation: res?.donation || res,
                  pointsAdded: pointsToAdd,
                  newDonor: res?.donor,
                };
                this.router.navigate(['/donor/donation/confirmed'], { state: navState });
              },
              error: (err) => {
                console.error('Erro ao criar doação', err);
                alert('Falha ao processar doação. Tente novamente.');
              },
            });
          },
          error: (err: any) => {
            this.donationService.create(donation, donor.id, pointsToAdd).subscribe({
              next: (res: any) => {
                try {
                  this.donationContext.clear();
                } catch {}
                const navState: any = {
                  donation: res?.donation || res,
                  pointsAdded: pointsToAdd,
                  newDonor: res?.donor,
                };
                this.router.navigate(['/donor/donation/confirmed'], { state: navState });
              },
              error: (err) => {
                console.error('Erro ao criar doação', err);
                alert('Falha ao processar doação. Tente novamente.');
              },
            });
          },
        });
      },
      error: (err: any) => {
        console.error('Erro carregando doadores', err);
        alert('Não foi possível acessar dados do doador.');
      },
    });
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

  constructor(
    private router: Router,
    private donationContext: DonationContextService,
    private donationService: DonationService,
    private mockApi: MockApiService,
    private pixService: PixService
  ) {}

  ngOnInit(): void {
    const navState = this.router.getCurrentNavigation()?.extras?.state as
      | { institution?: InstitutionData }
      | undefined;
    const histState =
      (window && (window.history as any) && (window.history as any).state) || undefined;

    const state = navState || histState;

    if (state && (state as any).institution) {
      const inst = (state as any).institution as InstitutionData;
      if (inst && inst.name) {
        this.institutionName = inst.name;
      }
    } else {
      const saved = this.donationContext.getSelectedInstitution();
      if (saved && saved.name) {
        this.institutionName = saved.name;
        this.donationContext.clear();
      }
    }
  }
}
