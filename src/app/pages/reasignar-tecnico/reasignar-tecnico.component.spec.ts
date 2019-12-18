import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasignarTecnicoComponent } from './reasignar-tecnico.component';

describe('ReasignarTecnicoComponent', () => {
  let component: ReasignarTecnicoComponent;
  let fixture: ComponentFixture<ReasignarTecnicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasignarTecnicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasignarTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
