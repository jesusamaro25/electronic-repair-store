import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMotivoRechazoComponent } from './modal-motivo-rechazo.component';

describe('ModalMotivoRechazoComponent', () => {
  let component: ModalMotivoRechazoComponent;
  let fixture: ComponentFixture<ModalMotivoRechazoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMotivoRechazoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMotivoRechazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
