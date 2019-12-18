import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionRealizadaComponent } from './revision-realizada.component';

describe('RevisionRealizadaComponent', () => {
  let component: RevisionRealizadaComponent;
  let fixture: ComponentFixture<RevisionRealizadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionRealizadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionRealizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
