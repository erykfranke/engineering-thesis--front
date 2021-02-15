import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourSliderComponent } from './hour-slider.component';

describe('HourSliderComponent', () => {
  let component: HourSliderComponent;
  let fixture: ComponentFixture<HourSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
