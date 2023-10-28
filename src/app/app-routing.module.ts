import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityListComponent } from './city/containers/city-list/city-list.component';
import { PointsOfInterestListComponent } from './point-of-interest/containers/points-of-interest-list/points-of-interest-list.component';
import { PointOfInterestComponent } from './point-of-interest/containers/point-of-interest/point-of-interest.component';

//routes to all different components
const routes: Routes = [
  {
    path: '', //list all cities
    component: CityListComponent
  },
  {
    path: 'pointsOfInterest', //list all points of interest
    component: PointsOfInterestListComponent
  },
  {
    path: 'pointOfInterest/:cityid/:id', //edit point of interest
    component: PointOfInterestComponent
  },
  {
    path: 'new_po/:cityid', //add point of interest
    component: PointOfInterestComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
