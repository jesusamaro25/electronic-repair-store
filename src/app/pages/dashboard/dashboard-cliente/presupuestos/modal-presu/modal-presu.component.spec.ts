import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPresuComponent } from './modal-presu.component';

describe('ModalPresuComponent', () => {
  let component: ModalPresuComponent;
  let fixture: ComponentFixture<ModalPresuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPresuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPresuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
