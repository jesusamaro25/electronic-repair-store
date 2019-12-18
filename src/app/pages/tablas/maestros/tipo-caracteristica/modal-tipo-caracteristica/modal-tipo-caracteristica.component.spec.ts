import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTipoCaracteristicaComponent } from './modal-tipo-caracteristica.component';

describe('ModalTipoCaracteristicaComponent', () => {
  let component: ModalTipoCaracteristicaComponent;
  let fixture: ComponentFixture<ModalTipoCaracteristicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTipoCaracteristicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTipoCaracteristicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
