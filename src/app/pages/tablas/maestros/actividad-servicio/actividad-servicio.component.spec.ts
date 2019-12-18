import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadServicioComponent } from './actividad-servicio.component';

describe('ActividadServicioComponent', () => {
  let component: ActividadServicioComponent;
  let fixture: ComponentFixture<ActividadServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
