import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEstructuradoIncidenciaComponent } from './reporte-estructurado-incidencia.component';

describe('ReporteEstructuradoIncidenciaComponent', () => {
  let component: ReporteEstructuradoIncidenciaComponent;
  let fixture: ComponentFixture<ReporteEstructuradoIncidenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEstructuradoIncidenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEstructuradoIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
