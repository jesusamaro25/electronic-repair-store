import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamoAsignadoComponent } from './reclamo-asignado.component';

describe('ReclamoAsignadoComponent', () => {
  let component: ReclamoAsignadoComponent;
  let fixture: ComponentFixture<ReclamoAsignadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamoAsignadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamoAsignadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
