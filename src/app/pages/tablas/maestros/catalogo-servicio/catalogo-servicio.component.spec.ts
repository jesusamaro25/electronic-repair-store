import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoServicioComponent } from './catalogo-servicio.component';

describe('CatalogoServicioComponent', () => {
  let component: CatalogoServicioComponent;
  let fixture: ComponentFixture<CatalogoServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
