import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCondicionesGarantiaComponent } from './modal-condiciones-garantia.component';

describe('ModalCondicionesGarantiaComponent', () => {
  let component: ModalCondicionesGarantiaComponent;
  let fixture: ComponentFixture<ModalCondicionesGarantiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCondicionesGarantiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCondicionesGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
