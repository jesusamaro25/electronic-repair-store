import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroClienteComponent } from './modal-registro-cliente.component';

describe('ModalRegistroClienteComponent', () => {
  let component: ModalRegistroClienteComponent;
  let fixture: ComponentFixture<ModalRegistroClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRegistroClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistroClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
