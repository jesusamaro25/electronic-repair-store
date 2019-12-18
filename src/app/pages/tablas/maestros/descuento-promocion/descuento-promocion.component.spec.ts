import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescuentoPromocionComponent } from './descuento-promocion.component';

describe('DescuentoPromocionComponent', () => {
  let component: DescuentoPromocionComponent;
  let fixture: ComponentFixture<DescuentoPromocionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescuentoPromocionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescuentoPromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
