import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReasignarTecnicoComponent } from './modal-reasignar-tecnico.component';

describe('ModalReasignarTecnicoComponent', () => {
  let component: ModalReasignarTecnicoComponent;
  let fixture: ComponentFixture<ModalReasignarTecnicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalReasignarTecnicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReasignarTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
