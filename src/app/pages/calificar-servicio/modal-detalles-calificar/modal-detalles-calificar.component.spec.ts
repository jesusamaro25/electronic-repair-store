import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallesCalificarComponent } from './modal-detalles-calificar.component';

describe('ModalDetallesCalificarComponent', () => {
  let component: ModalDetallesCalificarComponent;
  let fixture: ComponentFixture<ModalDetallesCalificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetallesCalificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetallesCalificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
