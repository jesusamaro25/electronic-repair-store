import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalServicioCaracteristicasComponent } from './modal-servicio-caracteristicas.component';

describe('ModalServicioCaracteristicasComponent', () => {
  let component: ModalServicioCaracteristicasComponent;
  let fixture: ComponentFixture<ModalServicioCaracteristicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalServicioCaracteristicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalServicioCaracteristicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
