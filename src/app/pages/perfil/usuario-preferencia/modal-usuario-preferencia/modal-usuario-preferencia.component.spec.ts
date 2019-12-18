import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUsuarioPreferenciaComponent } from './modal-usuario-preferencia.component';

describe('ModalUsuarioPreferenciaComponent', () => {
  let component: ModalUsuarioPreferenciaComponent;
  let fixture: ComponentFixture<ModalUsuarioPreferenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUsuarioPreferenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUsuarioPreferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
