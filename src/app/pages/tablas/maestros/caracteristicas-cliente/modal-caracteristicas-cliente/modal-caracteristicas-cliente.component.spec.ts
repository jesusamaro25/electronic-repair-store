import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCaracteristicasClienteComponent } from './modal-caracteristicas-cliente.component';

describe('ModalCaracteristicasClienteComponent', () => {
  let component: ModalCaracteristicasClienteComponent;
  let fixture: ComponentFixture<ModalCaracteristicasClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCaracteristicasClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCaracteristicasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
