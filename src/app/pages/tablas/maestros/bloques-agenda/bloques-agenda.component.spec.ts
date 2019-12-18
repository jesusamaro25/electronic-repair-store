import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloquesAgendaComponent } from './bloques-agenda.component';

describe('BloquesAgendaComponent', () => {
  let component: BloquesAgendaComponent;
  let fixture: ComponentFixture<BloquesAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloquesAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloquesAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
