import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDescuentoPromocionComponent } from './modal-descuento-promocion.component';

describe('ModalDescuentoPromocionComponent', () => {
  let component: ModalDescuentoPromocionComponent;
  let fixture: ComponentFixture<ModalDescuentoPromocionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDescuentoPromocionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDescuentoPromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
