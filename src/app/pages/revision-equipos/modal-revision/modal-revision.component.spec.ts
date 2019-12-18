import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRevisionComponent } from './modal-revision.component';

describe('ModalRevisionComponent', () => {
  let component: ModalRevisionComponent;
  let fixture: ComponentFixture<ModalRevisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRevisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
