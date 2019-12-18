import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBloquesAgendaComponent } from './modal-bloques-agenda.component';

describe('ModalBloquesAgendaComponent', () => {
  let component: ModalBloquesAgendaComponent;
  let fixture: ComponentFixture<ModalBloquesAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBloquesAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBloquesAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
