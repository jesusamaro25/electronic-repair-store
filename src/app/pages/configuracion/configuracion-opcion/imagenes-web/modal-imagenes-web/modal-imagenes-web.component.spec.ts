import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImagenesWebComponent } from './modal-imagenes-web.component';

describe('ModalImagenesWebComponent', () => {
  let component: ModalImagenesWebComponent;
  let fixture: ComponentFixture<ModalImagenesWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalImagenesWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImagenesWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
