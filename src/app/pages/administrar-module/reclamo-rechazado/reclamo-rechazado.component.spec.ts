import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamoRechazadoComponent } from './reclamo-rechazado.component';

describe('ReclamoRechazadoComponent', () => {
  let component: ReclamoRechazadoComponent;
  let fixture: ComponentFixture<ReclamoRechazadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamoRechazadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamoRechazadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
