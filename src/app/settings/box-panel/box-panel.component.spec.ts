import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxPanelComponent } from './box-panel.component';

describe('BoxPanelComponent', () => {
  let component: BoxPanelComponent;
  let fixture: ComponentFixture<BoxPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoxPanelComponent]
    });
    fixture = TestBed.createComponent(BoxPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
