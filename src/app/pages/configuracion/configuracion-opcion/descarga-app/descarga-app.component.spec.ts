import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargaAppComponent } from './descarga-app.component';

describe('DescargaAppComponent', () => {
  let component: DescargaAppComponent;
  let fixture: ComponentFixture<DescargaAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescargaAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescargaAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
