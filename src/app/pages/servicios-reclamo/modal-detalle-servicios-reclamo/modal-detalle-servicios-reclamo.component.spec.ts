import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleServiciosReclamoComponent } from './modal-detalle-servicios-reclamo.component';

describe('ModalDetalleServiciosReclamoComponent', () => {
  let component: ModalDetalleServiciosReclamoComponent;
  let fixture: ComponentFixture<ModalDetalleServiciosReclamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleServiciosReclamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleServiciosReclamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
