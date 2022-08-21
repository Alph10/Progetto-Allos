import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiGiacenzaComponent } from './aggiungi-giacenza.component';

describe('AggiungiGiacenzaComponent', () => {
  let component: AggiungiGiacenzaComponent;
  let fixture: ComponentFixture<AggiungiGiacenzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungiGiacenzaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungiGiacenzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
