import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristicasClienteComponent } from './caracteristicas-cliente.component';

describe('CaracteristicasClienteComponent', () => {
  let component: CaracteristicasClienteComponent;
  let fixture: ComponentFixture<CaracteristicasClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaracteristicasClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaracteristicasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
