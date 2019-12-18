import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRevisionReclamosComponent } from './modal-revision-reclamos.component';

describe('ModalRevisionReclamosComponent', () => {
  let component: ModalRevisionReclamosComponent;
  let fixture: ComponentFixture<ModalRevisionReclamosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRevisionReclamosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRevisionReclamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
