import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEstructuradoRevisionComponent } from './reporte-estructurado-revision.component';

describe('ReporteEstructuradoRevisionComponent', () => {
  let component: ReporteEstructuradoRevisionComponent;
  let fixture: ComponentFixture<ReporteEstructuradoRevisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEstructuradoRevisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEstructuradoRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
