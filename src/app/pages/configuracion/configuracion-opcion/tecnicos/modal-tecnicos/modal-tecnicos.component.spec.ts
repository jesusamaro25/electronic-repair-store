import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTecnicosComponent } from './modal-tecnicos.component';

describe('ModalTecnicosComponent', () => {
  let component: ModalTecnicosComponent;
  let fixture: ComponentFixture<ModalTecnicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTecnicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
