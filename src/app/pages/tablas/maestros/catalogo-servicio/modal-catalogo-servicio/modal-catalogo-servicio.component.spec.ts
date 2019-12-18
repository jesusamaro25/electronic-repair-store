import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCatalogoServicioComponent } from './modal-catalogo-servicio.component';

describe('ModalCatalogoServicioComponent', () => {
  let component: ModalCatalogoServicioComponent;
  let fixture: ComponentFixture<ModalCatalogoServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCatalogoServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCatalogoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
