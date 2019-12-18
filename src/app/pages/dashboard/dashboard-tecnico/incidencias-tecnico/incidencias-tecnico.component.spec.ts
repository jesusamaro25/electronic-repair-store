import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenciasTecnicoComponent } from './incidencias-tecnico.component';

describe('IncidenciasTecnicoComponent', () => {
  let component: IncidenciasTecnicoComponent;
  let fixture: ComponentFixture<IncidenciasTecnicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidenciasTecnicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenciasTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
