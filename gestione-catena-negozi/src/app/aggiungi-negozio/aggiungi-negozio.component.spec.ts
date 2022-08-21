import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiNegozioComponent } from './aggiungi-negozio.component';

describe('AggiungiNegozioComponent', () => {
  let component: AggiungiNegozioComponent;
  let fixture: ComponentFixture<AggiungiNegozioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungiNegozioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungiNegozioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
