import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsOfInterestListComponent } from './points-of-interest-list.component';

describe('PointsOfInterestListComponent', () => {
  let component: PointsOfInterestListComponent;
  let fixture: ComponentFixture<PointsOfInterestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsOfInterestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsOfInterestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
