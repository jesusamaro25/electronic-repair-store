import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaEquipoComponent } from './entrega-equipo.component';

describe('EntregaEquipoComponent', () => {
  let component: EntregaEquipoComponent;
  let fixture: ComponentFixture<EntregaEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregaEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
