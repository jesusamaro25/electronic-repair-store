import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalObjetivoComponent } from './modal-objetivo.component';

describe('ModalObjetivoComponent', () => {
  let component: ModalObjetivoComponent;
  let fixture: ComponentFixture<ModalObjetivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalObjetivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalObjetivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
