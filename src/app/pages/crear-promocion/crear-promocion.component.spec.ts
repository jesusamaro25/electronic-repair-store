import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPromocionComponent } from './crear-promocion.component';

describe('CrearPromocionComponent', () => {
  let component: CrearPromocionComponent;
  let fixture: ComponentFixture<CrearPromocionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPromocionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPromocionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
