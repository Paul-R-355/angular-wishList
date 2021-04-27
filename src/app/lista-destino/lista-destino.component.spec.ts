import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDestinoComponent } from './lista-destino.component';

describe('ListaDestinoComponent', () => {
  let component: ListaDestinoComponent;
  let fixture: ComponentFixture<ListaDestinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDestinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
