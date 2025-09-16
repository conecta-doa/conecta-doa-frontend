import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paineldoador } from './paineldoador';

describe('Paineldoador', () => {
  let component: Paineldoador;
  let fixture: ComponentFixture<Paineldoador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paineldoador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paineldoador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
