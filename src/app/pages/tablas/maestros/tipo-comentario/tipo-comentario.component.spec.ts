import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoComentarioComponent } from './tipo-comentario.component';

describe('TipoComentarioComponent', () => {
  let component: TipoComentarioComponent;
  let fixture: ComponentFixture<TipoComentarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
