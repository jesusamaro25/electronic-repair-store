import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPreguntaCalificacionComponent } from './modal-pregunta-calificacion.component';

describe('ModalPreguntaCalificacionComponent', () => {
  let component: ModalPreguntaCalificacionComponent;
  let fixture: ComponentFixture<ModalPreguntaCalificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPreguntaCalificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPreguntaCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
