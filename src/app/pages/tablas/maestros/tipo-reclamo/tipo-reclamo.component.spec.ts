import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoReclamoComponent } from './tipo-reclamo.component';

describe('TipoReclamoComponent', () => {
  let component: TipoReclamoComponent;
  let fixture: ComponentFixture<TipoReclamoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoReclamoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoReclamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
