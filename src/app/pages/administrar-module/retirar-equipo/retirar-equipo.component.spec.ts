import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirarEquipoComponent } from './retirar-equipo.component';

describe('RetirarEquipoComponent', () => {
  let component: RetirarEquipoComponent;
  let fixture: ComponentFixture<RetirarEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetirarEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirarEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
