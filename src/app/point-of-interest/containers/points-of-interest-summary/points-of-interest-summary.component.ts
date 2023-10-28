import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, filter, takeUntil } from 'rxjs';
import { City } from 'src/app/city/models/city.model';
import { CityApiService } from 'src/app/city/services/city-api.service';

@Component({
  selector: 'app-points-of-interest-summary',
  templateUrl: './points-of-interest-summary.component.html',
  styleUrls: ['./points-of-interest-summary.component.scss']
})
export class PointsOfInterestSummaryComponent implements OnInit, OnDestroy {
  citiesDetails: City[];
  numCities: number;
  numPtOfInt: number;
  destroyed$ = new Subject();  

  constructor(private cityApiSvc: CityApiService) { }

  ngOnInit(): void {
    this.subscribeToCityDetails();
  }

  subscribeToCityDetails() {
    //!!AK1 Subscribe to subject's observable
    this.cityApiSvc.cities$.pipe(takeUntil(this.destroyed$)).pipe(
      filter(citiesDetails => typeof citiesDetails != 'undefined' &&  citiesDetails !=  null)
    )
    .subscribe ({
      next: (citiesDetails) => {
        this.citiesDetails = citiesDetails;
        this.numCities = citiesDetails?.length ?? 0;
        this.numPtOfInt = 0
        citiesDetails.map(cityDetails => this.numPtOfInt += cityDetails.pointsOfInterest.length);
      }
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }

}
