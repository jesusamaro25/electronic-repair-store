import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEspecialidadComponent } from './usuario-especialidad.component';

describe('UsuarioEspecialidadComponent', () => {
  let component: UsuarioEspecialidadComponent;
  let fixture: ComponentFixture<UsuarioEspecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioEspecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
