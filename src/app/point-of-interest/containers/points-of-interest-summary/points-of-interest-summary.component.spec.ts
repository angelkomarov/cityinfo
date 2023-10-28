import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsOfInterestSummaryComponent } from './points-of-interest-summary.component';

describe('PointsOfInterestSummaryComponent', () => {
  let component: PointsOfInterestSummaryComponent;
  let fixture: ComponentFixture<PointsOfInterestSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsOfInterestSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointsOfInterestSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
