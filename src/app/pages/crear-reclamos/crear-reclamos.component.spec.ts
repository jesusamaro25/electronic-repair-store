import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearReclamosComponent } from './crear-reclamos.component';

describe('CrearReclamosComponent', () => {
  let component: CrearReclamosComponent;
  let fixture: ComponentFixture<CrearReclamosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearReclamosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearReclamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
