import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEstructuradoComponent } from './reporte-estructurado.component';

describe('ReporteEstructuradoComponent', () => {
  let component: ReporteEstructuradoComponent;
  let fixture: ComponentFixture<ReporteAtencionClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEstructuradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEstructuradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
