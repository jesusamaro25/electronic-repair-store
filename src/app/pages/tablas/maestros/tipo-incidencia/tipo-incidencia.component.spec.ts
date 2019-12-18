import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoIncidenciaComponent } from './tipo-incidencia.component';

describe('TipoIncidenciaComponent', () => {
  let component: TipoIncidenciaComponent;
  let fixture: ComponentFixture<TipoIncidenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoIncidenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
