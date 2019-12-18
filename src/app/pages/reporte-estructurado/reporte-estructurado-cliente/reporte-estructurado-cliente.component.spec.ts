import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEstructuradoClienteComponent } from './reporte-estructurado-cliente.component';

describe('ReporteEstructuradoClienteComponent', () => {
  let component: ReporteEstructuradoClienteComponent;
  let fixture: ComponentFixture<ReporteEstructuradoClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEstructuradoClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEstructuradoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
