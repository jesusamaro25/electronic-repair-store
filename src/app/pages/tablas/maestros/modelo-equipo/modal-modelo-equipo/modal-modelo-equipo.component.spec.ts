import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModeloEquipoComponent } from './modal-modelo-equipo.component';

describe('ModalModeloEquipoComponent', () => {
  let component: ModalModeloEquipoComponent;
  let fixture: ComponentFixture<ModalModeloEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalModeloEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalModeloEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
