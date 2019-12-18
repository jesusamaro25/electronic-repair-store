import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTipoEquipoComponent } from './modal-tipo-equipo.component';

describe('ModalTipoEquipoComponent', () => {
  let component: ModalTipoEquipoComponent;
  let fixture: ComponentFixture<ModalTipoEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTipoEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTipoEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
