import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaGiacenzaComponent } from './modifica-giacenza.component';

describe('ModificaGiacenzaComponent', () => {
  let component: ModificaGiacenzaComponent;
  let fixture: ComponentFixture<ModificaGiacenzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaGiacenzaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaGiacenzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
