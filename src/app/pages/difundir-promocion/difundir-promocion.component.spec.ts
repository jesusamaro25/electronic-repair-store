import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DifundirPromocionComponent } from './difundir-promocion.component';

describe('DifundirPromocionComponent', () => {
  let component: DifundirPromocionComponent;
  let fixture: ComponentFixture<DifundirPromocionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DifundirPromocionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifundirPromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
