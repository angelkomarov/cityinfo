//https://ng-bootstrap.github.io/#/components/toast/examples
//create toast service - will be called to bring the toast component
//ng generate service services\AppToast
import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppToastService {
  toasts: any[] = [];

  constructor() { }
    
  show(header: string, body: string) {
    this.toasts.push({ header, body });
  }

  showSuccess(header: string, body: string) {
    this.toasts.push({ header,  classname: 'bg-success text-light', body });
  }

  showError(header: string, body: string) {
    this.toasts.push({ header,  classname: 'bg-danger text-light', body });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}
