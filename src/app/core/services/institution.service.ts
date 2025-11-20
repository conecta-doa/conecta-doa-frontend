import { Injectable } from '@angular/core';

export interface InstitutionData {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  image: string;
  badge?: string;
  icon?: string;
  accentClass?: string;
  location?: string;
  phone?: string;
  email?: string;
}

@Injectable({ providedIn: 'root' })
export class InstitutionService {
  private readonly institutions: InstitutionData[] = [
    {
      slug: 'lar-da-esperanca',
      name: 'Lar da Esperança',
      description: 'Lar para crianças em situação de vulnerabilidade.',
      tags: ['Infância', 'Proteção'],
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB5SJdc1dt7crIv-GUsqIfC00Ikm_eW3IXL7_bOedcsXL_R9OGkYHABE9OuzA55cPNJ7L8BDSoTBd7dChhULJwtzyAcN8MyohqhbwJViQacIYFgQY71uepGJ6OXBEffTtmfFuH6R31Y79WjdvTjhf6GkvHQILDfQ2F_C03qr51JOlMckBnHt4WRxINKPYR9rKwMqWM42R0mmCidEB6GpjCKCgbITSFJsKIgLkcnfoHW1GebxDxkDC25kIOC6j58oJp9tT4vZDvKJ8Q',
      badge: 'Sangue: A+, O-',
      icon: 'local_hospital',
      accentClass: 'text-green-500',
      location: 'São Paulo, SP',
      phone: '(11) 1111-1111',
      email: 'contato@lardoesperanca.org',
    },
    {
      slug: 'abrigo-dos-animais',
      name: 'Abrigo dos Animais',
      description: 'Abrigo para animais abandonados e resgatados.',
      tags: ['Animais', 'Resgate'],
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB8unW4a8eBcxRohDNB5A1dTkzA9g6Z1fWfws9sJtQ-70SIyUte9DpL8ZFw033mPksjSoqv4PZSQ9OD08xeEH3l-0eqiF6sokty4yYcFxSoOcxjVQrD6o0xMxh0KSQ9qROEXxJnZ5u5XRpdE9Z5-InxNMzJOzIApCWi4haEzygB0DZQUFP1W-45r3D3pcIIuAhzbZweE9_YlJf3eiyRAGP-FQHl96xtyMk7NzfNAW5XrgEQWcu6hg1BRp3goa9Kli8YzWgqJ_Z0AdM',
      badge: 'Ração, Remédios',
      icon: 'pets',
      accentClass: 'text-blue-500',
      location: 'Curitiba, PR',
      phone: '(41) 2222-2222',
      email: 'contato@abrigodosanimais.org',
    },
    {
      slug: 'banco-de-alimentos-solidario',
      name: 'Banco de Alimentos Solidário',
      description: 'Combate à fome distribuindo alimentos para famílias carentes.',
      tags: ['Fome', 'Alimentos'],
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDpyv1OjTJgxVrmevSrP2RLBKFvqjD4sRYZlQa0IB-7f9uKERxCDZYBOBHOccs1t-vqsFzEDtlsUDWr-hbaQiALGkAARHbhzFkEuN5vVpgaKdPAj5a6XNegP8-P34tKJIKhBz_zRJdTfNQm4SLwNZI2T4LgJjREQnaUsG6H7wEP9y-IM0RkMilNgWaXmh23Bzigg87jyZJcCi8U6JgOC7G37HhkagNEL640O2wc9l4cHWDbVslUgaw7ES2_3pz9QBaK0n-j1GIcW_k',
      badge: 'Não perecíveis',
      icon: 'restaurant',
      accentClass: 'text-yellow-500',
      location: 'Recife, PE',
      phone: '(81) 3333-3333',
      email: 'contato@bancodesolidario.org',
    },
    {
      slug: 'casa-do-idoso-feliz',
      name: 'Casa do Idoso Feliz',
      description: 'Lar para idosos que precisam de cuidados e companhia.',
      tags: ['Idosos', 'Cuidados'],
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ3z97SnUdZ59ljrArAgvHMx0KSecjlc3UpHV8UJPx5pnFP_tT5tYlN0QwqkfEnEp3bzmyKNlNBdCU_WbEel_WOwInSgbbeHYSfFZ3Ocqs4WKhPlPyc5hbl_8ibRXKEL_a9GidwPIJ-7gd4bL7Lkq8DFYnsMuIF7DBDfGOfJ1QzCwWBuNmLJNcUkPO99FTo-GCZdxBfi0g0o7S29cT-TQA_66jBaZAlwDQPkBovhDIrJ3S0yh7cLwlmwvXMNddAfwn3orxH7JSs9M',
      badge: 'Fraldas, Roupas',
      icon: 'elderly',
      accentClass: 'text-purple-500',
      location: 'Porto Alegre, RS',
      phone: '(51) 4444-4444',
      email: 'contato@casadoidosofeliz.org',
    },
  ];

  list(): InstitutionData[] {
    return this.institutions;
  }

  findBySlug(slug: string): InstitutionData | undefined {
    return this.institutions.find((i) => i.slug === slug);
  }
}
