import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesClienteComponent } from './solicitudes-cliente.component';

describe('SolicitudesClienteComponent', () => {
  let component: SolicitudesClienteComponent;
  let fixture: ComponentFixture<SolicitudesClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
