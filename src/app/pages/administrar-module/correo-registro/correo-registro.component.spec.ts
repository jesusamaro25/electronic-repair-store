import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreoRegistroComponent } from './correo-registro.component';

describe('CorreoRegistroComponent', () => {
  let component: CorreoRegistroComponent;
  let fixture: ComponentFixture<CorreoRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorreoRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorreoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
