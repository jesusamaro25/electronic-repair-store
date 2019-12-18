import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudRechazadaComponent } from './solicitud-rechazada.component';

describe('SolicitudRechazadaComponent', () => {
  let component: SolicitudRechazadaComponent;
  let fixture: ComponentFixture<SolicitudRechazadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudRechazadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudRechazadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
