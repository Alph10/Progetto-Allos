import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiArticoloComponent } from './aggiungi-articolo.component';

describe('AggiungiArticoloComponent', () => {
  let component: AggiungiArticoloComponent;
  let fixture: ComponentFixture<AggiungiArticoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungiArticoloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungiArticoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
