import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxDisplayComponent } from './box-display.component';

describe('BoxDisplayComponent', () => {
  let component: BoxDisplayComponent;
  let fixture: ComponentFixture<BoxDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoxDisplayComponent]
    });
    fixture = TestBed.createComponent(BoxDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
