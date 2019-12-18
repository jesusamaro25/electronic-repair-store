import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallesEvapresuComponent } from './modal-detalles-evapresu.component';

describe('ModalDetallesEvapresuComponent', () => {
  let component: ModalDetallesEvapresuComponent;
  let fixture: ComponentFixture<ModalDetallesEvapresuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetallesEvapresuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetallesEvapresuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
