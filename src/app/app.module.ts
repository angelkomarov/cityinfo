import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CityListComponent } from './city/containers/city-list/city-list.component';
import { InfoToastComponent } from './app-toasts/containers/info-toast/info-toast.component';
import { SidebarComponent } from './app-sidebar/containers/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PointsOfInterestListComponent } from './point-of-interest/containers/points-of-interest-list/points-of-interest-list.component';
import { PointsOfInterestSummaryComponent } from './point-of-interest/containers/points-of-interest-summary/points-of-interest-summary.component';
import { PointOfInterestComponent } from './point-of-interest/containers/point-of-interest/point-of-interest.component';

@NgModule({
  declarations: [
    AppComponent,
    CityListComponent,
    PointsOfInterestListComponent,
    InfoToastComponent,
    SidebarComponent,
    PointsOfInterestSummaryComponent,
    PointOfInterestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  //ref angular forms
    AppRoutingModule,
    NgbModule, //bootstrap module, toast
    HttpClientModule,  //Add imporrted Ref to HttpClient module
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent] //module statrup component
})
export class AppModule { }
