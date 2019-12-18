import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuracionGarantiaComponent } from './duracion-garantia.component';

describe('DuracionGarantiaComponent', () => {
  let component: DuracionGarantiaComponent;
  let fixture: ComponentFixture<DuracionGarantiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuracionGarantiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuracionGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
