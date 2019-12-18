import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReagendarComponent } from './reagendar.component';

describe('ReagendarComponent', () => {
  let component: ReagendarComponent;
  let fixture: ComponentFixture<ReagendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReagendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReagendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
