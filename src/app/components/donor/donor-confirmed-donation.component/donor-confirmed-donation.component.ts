import { AfterViewInit, Component, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-donor-confirmed-donation',
  templateUrl: './donor-confirmed-donation.component.html',
  standalone: false,
  styleUrls: ['./donor-confirmed-donation.component.css'],
})
export class DonorConfirmedDonationComponent implements AfterViewInit, OnInit {
  donatedAmount: number | null = null;
  formattedAmount: string = 'R$ 0,00';
  pointsAdded: number = 0;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    const state = (window && (window.history as any) && (window.history as any).state) || {};
    const donation = state?.donation || null;
    const points = state?.pointsAdded ?? null;

    if (donation && typeof donation === 'object') {
      if (donation.amount != null) {
        this.donatedAmount = Number(donation.amount) || 0;
        try {
          this.formattedAmount = this.donatedAmount.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          this.formattedAmount = `R$ ${this.formattedAmount}`;
        } catch {
          this.formattedAmount = `R$ ${Number(this.donatedAmount).toFixed(2)}`;
        }
      }
    }

    if (points != null) {
      this.pointsAdded = Number(points) || 0;
    } else {
      if (this.donatedAmount && this.donatedAmount > 0)
        this.pointsAdded = Math.max(1, Math.round(this.donatedAmount));
    }
  }

  ngAfterViewInit(): void {
    const COLORS = ['#e63946', '#ffd166', '#06d6a0', '#118ab2', '#ffcf6b'];
    const COUNT = 120;
    const container = this.renderer.createElement('div');
    this.renderer.addClass(container, 'confetti-container');
    this.renderer.appendChild(document.body, container);

    const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < COUNT; i++) {
      const el = this.renderer.createElement('div');
      this.renderer.addClass(el, 'confetti');
      const size = rand(6, 12);
      this.renderer.setStyle(el, 'width', size + 'px');
      this.renderer.setStyle(el, 'height', size + 'px');
      this.renderer.setStyle(el, 'left', Math.random() * 100 + 'vw');
      this.renderer.setStyle(el, 'top', Math.random() * -50 + 'vh');
      this.renderer.setStyle(el, 'background', COLORS[Math.floor(Math.random() * COLORS.length)]);
      const duration = rand(4500, 8500);
      const delay = Math.random() * 1500;
      this.renderer.setStyle(el, 'animationDuration', duration + 'ms');
      this.renderer.setStyle(el, 'animationDelay', delay + 'ms');
      this.renderer.setStyle(el, 'opacity', (0.7 + Math.random() * 0.3).toString());
      this.renderer.setAttribute(el, 'data-drift', Math.random() > 0.5 ? 'left' : 'right');
      this.renderer.appendChild(container, el);
    }

    const recycle = () => {
      const pieces = container.children;
      for (let i = 0; i < pieces.length; i++) {
        const el = pieces[i] as HTMLElement;
        const rect = el.getBoundingClientRect();
        if (rect.top > window.innerHeight + 50) {
          this.renderer.setStyle(el, 'top', Math.random() * -40 + 'vh');
          this.renderer.setStyle(el, 'left', Math.random() * 100 + 'vw');
          this.renderer.setStyle(el, 'animationDuration', rand(4500, 8500) + 'ms');
          this.renderer.setStyle(el, 'animationDelay', Math.random() * 1500 + 'ms');
          this.renderer.setStyle(
            el,
            'background',
            COLORS[Math.floor(Math.random() * COLORS.length)]
          );
        }
      }
    };

    setInterval(recycle, 1500);
    window.addEventListener(
      'scroll',
      () => {
        const sY = window.scrollY;
        (container as HTMLElement).style.transform = `translateY(${Math.floor(sY * 0.02)}px)`;
      },
      { passive: true }
    );
    const card = document.querySelector('.card');
    if (card) (card as HTMLElement).style.zIndex = '10';
  }
}
