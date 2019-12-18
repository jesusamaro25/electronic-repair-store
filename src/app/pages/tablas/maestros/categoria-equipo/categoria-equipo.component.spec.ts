import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaEquipoComponent } from './categoria-equipo.component';

describe('CategoriaEquipoComponent', () => {
  let component: CategoriaEquipoComponent;
  let fixture: ComponentFixture<CategoriaEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
