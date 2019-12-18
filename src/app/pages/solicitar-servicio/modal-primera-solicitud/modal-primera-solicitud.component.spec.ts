import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPrimeraSolicitudComponent } from './modal-primera-solicitud.component';

describe('ModalPrimeraSolicitudComponent', () => {
  let component: ModalPrimeraSolicitudComponent;
  let fixture: ComponentFixture<ModalPrimeraSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPrimeraSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPrimeraSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
