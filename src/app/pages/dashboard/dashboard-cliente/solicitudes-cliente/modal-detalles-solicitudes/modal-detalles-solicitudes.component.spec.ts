import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallesSolicitudesComponent } from './modal-detalles-solicitudes.component';

describe('ModalDetallesSolicitudesComponent', () => {
  let component: ModalDetallesSolicitudesComponent;
  let fixture: ComponentFixture<ModalDetallesSolicitudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetallesSolicitudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetallesSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
