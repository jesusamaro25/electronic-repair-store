import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionReclamoRealizadaComponent } from './revision-reclamo-realizada.component';

describe('RevisionReclamoRealizadaComponent', () => {
  let component: RevisionReclamoRealizadaComponent;
  let fixture: ComponentFixture<RevisionReclamoRealizadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionReclamoRealizadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionReclamoRealizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
