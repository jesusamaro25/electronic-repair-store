import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEstadisticoServiciosComponent } from './reporte-estadistico-servicios.component';

describe('ReporteEstadisticoServiciosComponent', () => {
  let component: ReporteEstadisticoServiciosComponent;
  let fixture: ComponentFixture<ReporteEstadisticoServiciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEstadisticoServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEstadisticoServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
