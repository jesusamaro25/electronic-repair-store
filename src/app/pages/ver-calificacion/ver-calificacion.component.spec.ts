import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCalificacionComponent } from './ver-calificacion.component';

describe('VerCalificacionComponent', () => {
  let component: VerCalificacionComponent;
  let fixture: ComponentFixture<VerCalificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerCalificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
