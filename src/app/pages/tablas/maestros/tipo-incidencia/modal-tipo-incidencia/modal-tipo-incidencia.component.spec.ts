import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTipoIncidenciaComponent } from './modal-tipo-incidencia.component';

describe('ModalTipoIncidenciaComponent', () => {
  let component: ModalTipoIncidenciaComponent;
  let fixture: ComponentFixture<ModalTipoIncidenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTipoIncidenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTipoIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
