import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituitionRegisterComponent } from './instituition-register.component';

describe('RegisterInstitution', () => {
  let component: InstituitionRegisterComponent;
  let fixture: ComponentFixture<InstituitionRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstituitionRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituitionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
