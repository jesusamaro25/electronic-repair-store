import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCaracteristicaComponent } from './tipo-caracteristica.component';

describe('TipoCaracteristicaComponent', () => {
  let component: TipoCaracteristicaComponent;
  let fixture: ComponentFixture<TipoCaracteristicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoCaracteristicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCaracteristicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
