import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComentarioComponent } from './modal-comentario.component';

describe('ModalComentarioComponent', () => {
  let component: ModalComentarioComponent;
  let fixture: ComponentFixture<ModalComentarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
