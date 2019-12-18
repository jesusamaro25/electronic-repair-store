import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEstructuradoGarantiaComponent } from './reporte-estructurado-garantia.component';

describe('ReporteEstructuradoGarantiaComponent', () => {
  let component: ReporteEstructuradoGarantiaComponent;
  let fixture: ComponentFixture<ReporteEstructuradoGarantiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEstructuradoGarantiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEstructuradoGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
