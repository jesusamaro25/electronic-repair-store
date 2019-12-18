import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTimelineSolicitudesComponent } from './modal-timeline-solicitudes.component';

describe('ModalTimelineSolicitudesComponent', () => {
  let component: ModalTimelineSolicitudesComponent;
  let fixture: ComponentFixture<ModalTimelineSolicitudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTimelineSolicitudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTimelineSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
