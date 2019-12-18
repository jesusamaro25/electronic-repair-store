import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallesEquipoReparacionComponent } from './modal-detalles-equipo-reparacion.component';

describe('ModalDetallesEquipoReparacionComponent', () => {
  let component: ModalDetallesEquipoReparacionComponent;
  let fixture: ComponentFixture<ModalDetallesEquipoReparacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetallesEquipoReparacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetallesEquipoReparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
