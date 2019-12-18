import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReclamoComponent } from './modal-reclamo.component';

describe('ModalReclamoComponent', () => {
  let component: ModalReclamoComponent;
  let fixture: ComponentFixture<ModalReclamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalReclamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReclamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
