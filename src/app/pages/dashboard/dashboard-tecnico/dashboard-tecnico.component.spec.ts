import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTecnicoComponent } from './dashboard-tecnico.component';

describe('DashboardTecnicoComponent', () => {
  let component: DashboardTecnicoComponent;
  let fixture: ComponentFixture<DashboardTecnicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTecnicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
