import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDuracionGarantiaComponent } from './modal-duracion-garantia.component';

describe('ModalDuracionGarantiaComponent', () => {
  let component: ModalDuracionGarantiaComponent;
  let fixture: ComponentFixture<ModalDuracionGarantiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDuracionGarantiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDuracionGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
