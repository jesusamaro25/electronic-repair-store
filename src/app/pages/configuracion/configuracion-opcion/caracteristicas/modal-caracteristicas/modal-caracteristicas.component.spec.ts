import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCaracteristicasComponent } from './modal-caracteristicas.component';

describe('ModalCaracteristicasComponent', () => {
  let component: ModalCaracteristicasComponent;
  let fixture: ComponentFixture<ModalCaracteristicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCaracteristicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCaracteristicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
