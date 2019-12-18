import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTimelineEquiposReparacionComponent } from './modal-timeline-equipos-reparacion.component';

describe('ModalTimelineEquiposReparacionComponent', () => {
  let component: ModalTimelineEquiposReparacionComponent;
  let fixture: ComponentFixture<ModalTimelineEquiposReparacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTimelineEquiposReparacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTimelineEquiposReparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
