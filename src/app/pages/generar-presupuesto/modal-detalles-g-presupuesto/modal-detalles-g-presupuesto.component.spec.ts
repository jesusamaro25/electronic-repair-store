import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallesGPresupuestoComponent } from './modal-detalles-g-presupuesto.component';

describe('ModalDetallesGPresupuestoComponent', () => {
  let component: ModalDetallesGPresupuestoComponent;
  let fixture: ComponentFixture<ModalDetallesGPresupuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetallesGPresupuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetallesGPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
