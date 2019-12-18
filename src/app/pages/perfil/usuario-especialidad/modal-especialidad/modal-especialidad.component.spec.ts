import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEspecialidadComponent } from './modal-especialidad.component';

describe('ModalEspecialidadComponent', () => {
  let component: ModalEspecialidadComponent;
  let fixture: ComponentFixture<ModalEspecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEspecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
