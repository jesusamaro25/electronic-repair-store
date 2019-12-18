import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaEquipoComponent } from './marca-equipo.component';

describe('MarcaEquipoComponent', () => {
  let component: MarcaEquipoComponent;
  let fixture: ComponentFixture<MarcaEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcaEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
