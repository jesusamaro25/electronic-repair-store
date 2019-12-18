import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMarcaEquipoComponent } from './modal-marca-equipo.component';

describe('ModalMarcaEquipoComponent', () => {
  let component: ModalMarcaEquipoComponent;
  let fixture: ComponentFixture<ModalMarcaEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMarcaEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMarcaEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
