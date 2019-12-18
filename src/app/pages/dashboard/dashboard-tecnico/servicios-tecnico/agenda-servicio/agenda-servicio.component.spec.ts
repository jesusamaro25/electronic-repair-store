import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaServicioComponent } from './agenda-servicio.component';

describe('AgendaServicioComponent', () => {
  let component: AgendaServicioComponent;
  let fixture: ComponentFixture<AgendaServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
