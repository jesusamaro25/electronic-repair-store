import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresupuestoGeneradoComponent } from './presupuesto-generado.component';

describe('PresupuestoGeneradoComponent', () => {
  let component: PresupuestoGeneradoComponent;
  let fixture: ComponentFixture<PresupuestoGeneradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresupuestoGeneradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresupuestoGeneradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
