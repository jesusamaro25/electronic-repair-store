import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEstructuradoSolicitudComponent } from './reporte-estructurado-solicitud.component';

describe('ReporteEstructuradoSolicitudComponent', () => {
  let component: ReporteEstructuradoSolicitudComponent;
  let fixture: ComponentFixture<ReporteEstructuradoSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEstructuradoSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEstructuradoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
