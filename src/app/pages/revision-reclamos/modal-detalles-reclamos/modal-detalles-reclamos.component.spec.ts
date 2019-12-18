import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallesReclamosComponent } from './modal-detalles-reclamos.component';

describe('ModalDetallesReclamosComponent', () => {
  let component: ModalDetallesReclamosComponent;
  let fixture: ComponentFixture<ModalDetallesReclamosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetallesReclamosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetallesReclamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
