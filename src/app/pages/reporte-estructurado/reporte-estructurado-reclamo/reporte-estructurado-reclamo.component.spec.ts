import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEstructuradoReclamoComponent } from './reporte-estructurado-reclamo.component';

describe('ReporteEstructuradoReclamoComponent', () => {
  let component: ReporteEstructuradoReclamoComponent;
  let fixture: ComponentFixture<ReporteEstructuradoReclamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEstructuradoReclamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEstructuradoReclamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
