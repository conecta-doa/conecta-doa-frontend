import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInstitution } from './instituition-register.component';

describe('RegisterInstitution', () => {
  let component: RegisterInstitution;
  let fixture: ComponentFixture<RegisterInstitution>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterInstitution]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterInstitution);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
