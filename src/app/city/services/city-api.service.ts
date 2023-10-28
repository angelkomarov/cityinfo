import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //.1 - import Angular HttpClient
import { City } from '../models/city.model';
import { BehaviorSubject, EMPTY, Observable, Subject, catchError, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityApiService {

  //!!AK1 - return subject
  // private citiesSubject$: Subject<City[]> = new Subject<City[]>;
  //--AK1.1 Cached data - to send to other observers
  private citiesSubject$: BehaviorSubject<City[]> = new BehaviorSubject<City[]>(undefined);

  cities$: Observable<City[]> = this.citiesSubject$.asObservable();
  private errorSubject$: Subject<{status: number, message: string}> = new Subject<{status: number, message: string}>();
  errors$: Observable<{status: number, message: string}> = this.errorSubject$.asObservable();

  constructor(private http: HttpClient) { }

  //!!AK2 http returns Observable data 
  // getCities() : Observable<City[]> {
  //   return this.http.get<City[]>('https://localhost:44305/api/cities/async');
  // }

  //!!AK2 http returns Observable data - manipulate the data stream in between Observer / Observable
  getCities() : Observable<City[]> {
    return this.http.get<City[]>(environment.apiUrl).pipe(
      map(cities => {
        return cities; //return data stream
        //or - manipulate data stream in the middle before return         
        // return  cities.map(city => {
        //   return { ...city, name: 'px - ' + city.name, description: city.description + ' - OK' };
        // });
      }),
      catchError (err => { //return common error messsage to all subscribed components!
        console.error(err);
        //return throwError(err); //old rxjs way - deprecated
        return throwError(() => err); //new rxjs way
        // return EMPTY; //don't want to propagate the error         
      })
    );
  }

  //!!AK1 - return subject:
  getCitiesDetails() {
    this.http.get<City[]>(`${environment.apiUrl}/pointsofinterest`)
      //to manipulate the data stream in between Observer / Observable
      // .pipe(
      //   map(
      //     citiesDetails => {
      //       console.log(citiesDetails.map(cityDetails => cityDetails.name));
      //       return citiesDetails;
      //     }),
      //     catchError (err => {
      //       console.error(err);
      //       return throwError(() => err); //new rxjs way
      //     })
      // )
      .subscribe ({
        next: (citiesDetails) => {
          // console.log(citiesDetails.map(cityDetails => cityDetails.name));
          this.citiesSubject$.next(citiesDetails);
        },
        error: (err) => {
          console.error('+ Getting cities details error:', err);
          this.errorSubject$.next({status: err.status, message: err.message});
        }
      });
  }

  resetCityDetails() {
    this.citiesSubject$.next(undefined);
  }
}
