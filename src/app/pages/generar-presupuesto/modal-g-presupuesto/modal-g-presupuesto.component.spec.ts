import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGPresupuestoComponent } from './modal-g-presupuesto.component';

describe('ModalGPresupuestoComponent', () => {
  let component: ModalGPresupuestoComponent;
  let fixture: ComponentFixture<ModalGPresupuestoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGPresupuestoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
