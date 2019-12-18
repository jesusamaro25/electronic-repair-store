import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisoRolComponent } from './permiso-rol.component';

describe('PermisoRolComponent', () => {
  let component: PermisoRolComponent;
  let fixture: ComponentFixture<PermisoRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermisoRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisoRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
