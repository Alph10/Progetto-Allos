import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaNegozioComponent } from './modifica-negozio.component';

describe('ModificaNegozioComponent', () => {
  let component: ModificaNegozioComponent;
  let fixture: ComponentFixture<ModificaNegozioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaNegozioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaNegozioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
