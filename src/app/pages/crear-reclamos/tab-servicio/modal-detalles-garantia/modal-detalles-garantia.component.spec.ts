import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallesGarantiaComponent } from './modal-detalles-garantia.component';

describe('ModalDetallesGarantiaComponent', () => {
  let component: ModalDetallesGarantiaComponent;
  let fixture: ComponentFixture<ModalDetallesGarantiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetallesGarantiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetallesGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
