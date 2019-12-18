import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenesWebComponent } from './imagenes-web.component';

describe('ImagenesWebComponent', () => {
  let component: ImagenesWebComponent;
  let fixture: ComponentFixture<ImagenesWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenesWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenesWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
