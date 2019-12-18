import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActividadPorServicioComponent } from './modal-actividad-por-servicio.component';

describe('ModalActividadPorServicioComponent', () => {
  let component: ModalActividadPorServicioComponent;
  let fixture: ComponentFixture<ModalActividadPorServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalActividadPorServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalActividadPorServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
