import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineReparacionComponent } from './timeline-reparacion.component';

describe('TimelineReparacionComponent', () => {
  let component: TimelineReparacionComponent;
  let fixture: ComponentFixture<TimelineReparacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineReparacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineReparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
