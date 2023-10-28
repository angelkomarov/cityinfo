import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { City } from '../../models/city.model';
import { AppToastService } from 'src/app/app-toasts/services/app-toast.service';
import { CityApiService } from '../../services/city-api.service';
import { ErrrorHandlerService } from 'src/app/shared/services/errror-handler.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();

  cities: City[] = []; 

  constructor(private cityApiSvc: CityApiService, 
    private toastService: AppToastService,
    private errHandlerService: ErrrorHandlerService) { } 

  ngOnInit() {
    this.subscribeToCities();
    // this.subscribeToCitiesLegacy();
  }

  //!!AK2.1 subscribe to observable old way!
  subscribeToCitiesLegacy() {
    this.cityApiSvc.getCities().pipe(takeUntil(this.destroyed$))
    .subscribe(
      cities => { this.cities = cities },
      err => {
        console.log('Getting cities error:', err);
        this.toastService.showError('Error', this.errHandlerService.getHttpErrorText(err));
      },
      () => console.log('done loading cities')      
    );
  }

  //!!AK2.2 subscribe to observable new way!
  subscribeToCities() {
    this.cityApiSvc.getCities().pipe(takeUntil(this.destroyed$))
    .subscribe({
      next: (cities) => {
        // console.log('got cities: ' + cities.map(city => city.name));
        this.cities = cities;
      },
      error: (err)  => {
        console.error('Getting cities error:', err);
        this.toastService.showError('Error', this.errHandlerService.getHttpErrorText(err));
      }
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
  

}
