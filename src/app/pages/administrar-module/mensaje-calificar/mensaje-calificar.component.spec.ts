import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeCalificarComponent } from './mensaje-calificar.component';

describe('MensajeCalificarComponent', () => {
  let component: MensajeCalificarComponent;
  let fixture: ComponentFixture<MensajeCalificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajeCalificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeCalificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
