import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCategoriaEquipoComponent } from './modal-categoria-equipo.component';

describe('ModalCategoriaEquipoComponent', () => {
  let component: ModalCategoriaEquipoComponent;
  let fixture: ComponentFixture<ModalCategoriaEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCategoriaEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCategoriaEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
