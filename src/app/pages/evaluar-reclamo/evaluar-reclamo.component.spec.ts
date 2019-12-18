import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluarReclamoComponent } from './evaluar-reclamo.component';

describe('EvaluarReclamoComponent', () => {
  let component: EvaluarReclamoComponent;
  let fixture: ComponentFixture<EvaluarReclamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluarReclamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluarReclamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
