import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEstadisticoIngresosComponent } from './reporte-servicio-ingresos.component';

describe('ReporteEstadisticoIngresosComponent', () => {
  let component: ReporteEstadisticoIngresosComponent;
  let fixture: ComponentFixture<ReporteEstadisticoIngresosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEstadisticoIngresosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEstadisticoIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
