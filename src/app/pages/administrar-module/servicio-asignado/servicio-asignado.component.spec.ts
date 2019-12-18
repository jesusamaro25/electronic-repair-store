import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioAsignadoComponent } from './servicio-asignado.component';

describe('ServicioAsignadoComponent', () => {
  let component: ServicioAsignadoComponent;
  let fixture: ComponentFixture<ServicioAsignadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioAsignadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioAsignadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
