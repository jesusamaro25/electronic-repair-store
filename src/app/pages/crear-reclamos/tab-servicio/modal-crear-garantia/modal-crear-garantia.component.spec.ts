import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearGarantiaComponent } from './modal-crear-garantia.component';

describe('ModalCrearGarantiaComponent', () => {
  let component: ModalCrearGarantiaComponent;
  let fixture: ComponentFixture<ModalCrearGarantiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCrearGarantiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
