import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaArticoloComponent } from './modifica-articolo.component';

describe('ModificaArticoloComponent', () => {
  let component: ModificaArticoloComponent;
  let fixture: ComponentFixture<ModificaArticoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaArticoloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaArticoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
