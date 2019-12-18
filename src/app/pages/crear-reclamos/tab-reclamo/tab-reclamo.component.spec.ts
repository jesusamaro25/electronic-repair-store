import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabReclamoComponent } from './tab-reclamo.component';

describe('TabReclamoComponent', () => {
  let component: TabReclamoComponent;
  let fixture: ComponentFixture<TabReclamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabReclamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabReclamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
