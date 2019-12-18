import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposReparacionComponent } from './equipos-reparacion.component';

describe('EquiposReparacionComponent', () => {
  let component: EquiposReparacionComponent;
  let fixture: ComponentFixture<EquiposReparacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquiposReparacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquiposReparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
