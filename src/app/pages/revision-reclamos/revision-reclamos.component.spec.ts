import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionReclamosComponent } from './revision-reclamos.component';

describe('RevisionReclamosComponent', () => {
  let component: RevisionReclamosComponent;
  let fixture: ComponentFixture<RevisionReclamosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionReclamosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionReclamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
