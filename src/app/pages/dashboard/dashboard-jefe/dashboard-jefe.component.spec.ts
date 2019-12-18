import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardJefeComponent } from './dashboard-jefe.component';

describe('DashboardJefeComponent', () => {
  let component: DashboardJefeComponent;
  let fixture: ComponentFixture<DashboardJefeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardJefeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardJefeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
