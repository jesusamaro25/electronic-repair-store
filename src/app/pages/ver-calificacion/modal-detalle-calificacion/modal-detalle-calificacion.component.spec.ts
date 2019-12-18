import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleCalificacionComponent } from './modal-detalle-calificacion.component';

describe('ModalDetalleCalificacionComponent', () => {
  let component: ModalDetalleCalificacionComponent;
  let fixture: ComponentFixture<ModalDetalleCalificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleCalificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
