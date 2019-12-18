import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEstadisticoTiemposComponent } from './reporte-estadistico-tiempos.component';

describe('ReporteEstadisticoTiemposComponent', () => {
  let component: ReporteEstadisticoTiemposComponent;
  let fixture: ComponentFixture<ReporteEstadisticoTiemposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEstadisticoTiemposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEstadisticoTiemposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
