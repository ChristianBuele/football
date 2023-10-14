import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfTimescoreComponent } from './half-timescore.component';

describe('HalfTimescoreComponent', () => {
  let component: HalfTimescoreComponent;
  let fixture: ComponentFixture<HalfTimescoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HalfTimescoreComponent]
    });
    fixture = TestBed.createComponent(HalfTimescoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
