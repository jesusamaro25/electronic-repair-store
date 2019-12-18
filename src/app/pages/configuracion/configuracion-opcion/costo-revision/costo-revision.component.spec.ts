import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostoRevisionComponent } from './costo-revision.component';

describe('CostoRevisionComponent', () => {
  let component: CostoRevisionComponent;
  let fixture: ComponentFixture<CostoRevisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostoRevisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostoRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
