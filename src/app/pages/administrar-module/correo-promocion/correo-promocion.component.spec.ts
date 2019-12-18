import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreoPromocionComponent } from './correo-promocion.component';

describe('CorreoPromocionComponent', () => {
  let component: CorreoPromocionComponent;
  let fixture: ComponentFixture<CorreoPromocionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorreoPromocionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorreoPromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
