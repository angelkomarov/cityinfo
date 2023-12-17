import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { PointOfInterest } from '../models/point-of-interest.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointOfInterestApiService {

  constructor(private http: HttpClient) { }
  
  getPointOfInterest(cityId: number, poId: number) : Observable<PointOfInterest> {
    return this.http.get<PointOfInterest>(`${environment.apiUrl}/cities/${cityId}/pointsofinterest?id=${poId}`).pipe(
      map((result: any) => {
        if (result?.length == 1) {
          return result[0];
        } else {
          console.error('bad service response - here service should raise an error!');
        }
      }),
      catchError (err => {
        console.error(err);
        return throwError(() => err);
      })
    );
  }

  createPointOfInterest(cityId: number, po: PointOfInterest) : Observable<any> {
    // let body = JSON.stringify(po);
    return this.http.post<any>(`${environment.apiUrl}/pointsofinterest/`, po).pipe(
      map(result => { 
        return result
      }),
      catchError (err => {
        console.error(err);
        return throwError(() => err);
      })
    );
  }
  
  updatePointOfInterest(cityId: number, po: PointOfInterest) : Observable<any> {
    // let body = JSON.stringify(po);
    return this.http.put<any>(`${environment.apiUrl}/pointsofinterest/${po.id}`, po).pipe(
      map(result => { 
        return result
      }),
      catchError(err => {
        console.error(err);
        return throwError(() => err); //new rxjs way
      })
    );
  }  

  deletePointOfInterest(cityId: number,  poId: number) : Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/pointsofinterest/${poId}`).pipe(
      map(result => { 
      return result
      }),
      catchError (err => {
        console.error(err);
        return throwError(() => err);
      })
    );
  }    

}
