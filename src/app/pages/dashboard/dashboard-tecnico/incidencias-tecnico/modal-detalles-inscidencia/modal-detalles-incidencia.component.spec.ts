import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallesIncidenciaComponent } from './modal-detalles-incidencia.component';

describe('ModalDetallesIncidenciaComponent', () => {
  let component: ModalDetallesIncidenciaComponent;
  let fixture: ComponentFixture<ModalDetallesIncidenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetallesIncidenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetallesIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
