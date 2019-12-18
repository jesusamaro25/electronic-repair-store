import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasTecnicoComponent } from './tareas-tecnico.component';

describe('TareasTecnicoComponent', () => {
  let component: TareasTecnicoComponent;
  let fixture: ComponentFixture<TareasTecnicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareasTecnicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
