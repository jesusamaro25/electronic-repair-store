import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearPromocionComponent } from './modal-crear-promocion.component';

describe('ModalCrearPromocionComponent', () => {
  let component: ModalCrearPromocionComponent;
  let fixture: ComponentFixture<ModalCrearPromocionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCrearPromocionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearPromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
