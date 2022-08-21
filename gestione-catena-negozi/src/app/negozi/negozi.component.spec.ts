import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegoziComponent } from './negozi.component';

describe('NegoziComponent', () => {
  let component: NegoziComponent;
  let fixture: ComponentFixture<NegoziComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NegoziComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NegoziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
