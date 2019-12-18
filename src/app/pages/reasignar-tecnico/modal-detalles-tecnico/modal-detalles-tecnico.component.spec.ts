import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallesTecnicoComponent } from './modal-detalles-tecnico.component';

describe('ModalDetallesTecnicoComponent', () => {
  let component: ModalDetallesTecnicoComponent;
  let fixture: ComponentFixture<ModalDetallesTecnicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetallesTecnicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetallesTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
