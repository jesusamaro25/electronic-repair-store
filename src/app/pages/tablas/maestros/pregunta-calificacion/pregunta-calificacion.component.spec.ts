import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaCalificacionComponent } from './pregunta-calificacion.component';

describe('PreguntaCalificacionComponent', () => {
  let component: PreguntaCalificacionComponent;
  let fixture: ComponentFixture<PreguntaCalificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntaCalificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntaCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
