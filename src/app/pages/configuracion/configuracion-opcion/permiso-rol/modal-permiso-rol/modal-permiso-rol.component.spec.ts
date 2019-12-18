import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPermisoRolComponent } from './modal-permiso-rol.component';

describe('ModalPermisoRolComponent', () => {
  let component: ModalPermisoRolComponent;
  let fixture: ComponentFixture<ModalPermisoRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPermisoRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPermisoRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
