import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrrorHandlerService {

  constructor() { }

  public getHttpErrorText(err: any): string {
    if (err.status == 0) {
      return err.message;  
    } else if (err.status >= 400 && err.status < 500) {
      return err.message;  
      // return err.error.title;
    } else if (err.status == 500) {
      return err.error.detail;
    } else {
      return 'undefined error';
    }
  }

}
