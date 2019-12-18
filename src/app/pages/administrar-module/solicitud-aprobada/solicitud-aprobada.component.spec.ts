import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudAprobadaComponent } from './solicitud-aprobada.component';

describe('SolicitudAprobadaComponent', () => {
  let component: SolicitudAprobadaComponent;
  let fixture: ComponentFixture<SolicitudAprobadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudAprobadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudAprobadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
