import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajePrimeraSolicitudComponent } from './mensaje-primera-solicitud.component';

describe('MensajePrimeraSolicitudComponent', () => {
  let component: MensajePrimeraSolicitudComponent;
  let fixture: ComponentFixture<MensajePrimeraSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajePrimeraSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajePrimeraSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
