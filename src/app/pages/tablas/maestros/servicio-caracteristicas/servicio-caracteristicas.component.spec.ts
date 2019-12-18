import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioCaracteristicasComponent } from './servicio-caracteristicas.component';

describe('ServicioCaracteristicasComponent', () => {
  let component: ServicioCaracteristicasComponent;
  let fixture: ComponentFixture<ServicioCaracteristicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioCaracteristicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioCaracteristicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
