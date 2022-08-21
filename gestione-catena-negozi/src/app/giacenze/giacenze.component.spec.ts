import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiacenzeComponent } from './giacenze.component';

describe('GiacenzeComponent', () => {
  let component: GiacenzeComponent;
  let fixture: ComponentFixture<GiacenzeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiacenzeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiacenzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
