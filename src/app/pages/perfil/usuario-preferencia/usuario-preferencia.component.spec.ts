import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPreferenciaComponent } from './usuario-preferencia.component';

describe('UsuarioPreferenciaComponent', () => {
  let component: UsuarioPreferenciaComponent;
  let fixture: ComponentFixture<UsuarioPreferenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioPreferenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioPreferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
