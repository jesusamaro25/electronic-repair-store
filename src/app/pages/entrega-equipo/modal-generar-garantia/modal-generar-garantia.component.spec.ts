import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGenerarGarantiaComponent } from './modal-generar-garantia.component';

describe('ModalGenerarGarantiaComponent', () => {
  let component: ModalGenerarGarantiaComponent;
  let fixture: ComponentFixture<ModalGenerarGarantiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGenerarGarantiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGenerarGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
