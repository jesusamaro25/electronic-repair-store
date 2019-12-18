import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamoAprobadoComponent } from './reclamo-aprobado.component';

describe('ReclamoAprobadoComponent', () => {
  let component: ReclamoAprobadoComponent;
  let fixture: ComponentFixture<ReclamoAprobadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamoAprobadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamoAprobadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
