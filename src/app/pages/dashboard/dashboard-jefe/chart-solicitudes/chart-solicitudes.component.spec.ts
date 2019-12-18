import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSolicitudesComponent } from './chart-solicitudes.component';

describe('ChartSolicitudesComponent', () => {
  let component: ChartSolicitudesComponent;
  let fixture: ComponentFixture<ChartSolicitudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartSolicitudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
