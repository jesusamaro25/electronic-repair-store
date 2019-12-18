import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEstadisticoTecnicosComponent } from './reporte-estadistico-tecnicos.component';

describe('ReporteEstadisticoTecnicosComponent', () => {
  let component: ReporteEstadisticoTecnicosComponent;
  let fixture: ComponentFixture<ReporteEstadisticoTecnicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEstadisticoTecnicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEstadisticoTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
