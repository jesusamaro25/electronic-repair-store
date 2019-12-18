import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionEquiposComponent } from './revision-equipos.component';

describe('RevisionEquiposComponent', () => {
  let component: RevisionEquiposComponent;
  let fixture: ComponentFixture<RevisionEquiposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionEquiposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
