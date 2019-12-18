import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabServicioComponent } from './tab-servicio.component';

describe('TabServicioComponent', () => {
  let component: TabServicioComponent;
  let fixture: ComponentFixture<TabServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
