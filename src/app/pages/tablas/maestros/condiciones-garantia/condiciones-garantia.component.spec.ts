import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionesGarantiaComponent } from './condiciones-garantia.component';

describe('CondicionesGarantiaComponent', () => {
  let component: CondicionesGarantiaComponent;
  let fixture: ComponentFixture<CondicionesGarantiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondicionesGarantiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionesGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
