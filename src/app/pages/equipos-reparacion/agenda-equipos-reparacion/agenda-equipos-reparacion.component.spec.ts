import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaEquiposReparacionComponent } from './agenda-equipos-reparacion.component';

describe('AgendaEquiposReparacionComponent', () => {
  let component: AgendaEquiposReparacionComponent;
  let fixture: ComponentFixture<AgendaEquiposReparacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaEquiposReparacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaEquiposReparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
