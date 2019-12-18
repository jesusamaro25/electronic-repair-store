import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosReclamoComponent } from './servicios-reclamo.component';

describe('ServiciosReclamoComponent', () => {
  let component: ServiciosReclamoComponent;
  let fixture: ComponentFixture<ServiciosReclamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosReclamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosReclamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
