import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTipoServicioComponent } from './modal-tipo-servicio.component';

describe('ModalTipoServicioComponent', () => {
  let component: ModalTipoServicioComponent;
  let fixture: ComponentFixture<ModalTipoServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTipoServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTipoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
