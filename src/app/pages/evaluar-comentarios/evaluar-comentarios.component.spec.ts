import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluarComentariosComponent } from './evaluar-comentarios.component';

describe('EvaluarComentariosComponent', () => {
  let component: EvaluarComentariosComponent;
  let fixture: ComponentFixture<EvaluarComentariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluarComentariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluarComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
