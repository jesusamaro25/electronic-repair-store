import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTipoComentarioComponent } from './modal-tipo-comentario.component';

describe('ModalTipoComentarioComponent', () => {
  let component: ModalTipoComentarioComponent;
  let fixture: ComponentFixture<ModalTipoComentarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTipoComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTipoComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
