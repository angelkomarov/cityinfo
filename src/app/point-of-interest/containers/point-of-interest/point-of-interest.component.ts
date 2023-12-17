import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { PointOfInterest } from '../../models/point-of-interest.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AppToastService } from 'src/app/app-toasts/services/app-toast.service';
import { PointOfInterestApiService } from '../../services/point-of-interest-api.service';
import { ErrrorHandlerService } from 'src/app/shared/services/errror-handler.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-point-of-interest',
  templateUrl: './point-of-interest.component.html',
  styleUrls: ['./point-of-interest.component.scss']
})
export class PointOfInterestComponent implements OnInit, OnDestroy {
  cityId: number;
  poId: number;
  routeEvent$: Subscription;
  changeMode: string;
  pointOfInterest: PointOfInterest;
  destroyed$ = new Subject();

  //inject route - to receive point of interest from route
  constructor(private route$: ActivatedRoute, 
    private router$: Router, 
    private poApiSvc: PointOfInterestApiService, 
    private toastService: AppToastService,
    private errHandlerService: ErrrorHandlerService) { }

  ngOnInit(): void {
    this.routeEvent$ = this.route$.params.subscribe( params => { 
      this.cityId = Number(params['cityid']); 
      //receive edit point of interest route - params.id = NaN
      this.poId = params['id'] ? Number(params['id']) : undefined;
    });

    this.pointOfInterest = {} as PointOfInterest;
    if (this.cityId && this.poId) { //edit
      this.changeMode = 'Edit';
      this.poApiSvc.getPointOfInterest(this.cityId, this.poId).pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (pointOfInterest) => { this.pointOfInterest = pointOfInterest; },
        error: (err) => { this.toastService.showError('Error', this.errHandlerService.getHttpErrorText(err)); }
      });
    } else { //new record
      this.changeMode = 'New';
      this.pointOfInterest = { cityId: this.cityId } as PointOfInterest;
    }

  }

  onSubmit(form: NgForm) {
    if (this.pointOfInterest.id) { //edit
      this.poApiSvc.updatePointOfInterest(this.cityId, this.pointOfInterest).pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: () => {
          this.toastService.showSuccess( 'Success', 'Point Of Interest has been updated');
          this.router$.navigateByUrl('pointsOfInterest');
        },
        error: (err) => { this.toastService.showError('Error', this.errHandlerService.getHttpErrorText(err)); }
      });
    }
    else { //new record
      this.poApiSvc.createPointOfInterest(this.cityId, this.pointOfInterest).pipe(takeUntil(this.destroyed$))
      .subscribe ({
        next: (po) => {
          this.toastService.showSuccess( 'Success', `Point Of Interest has been created: ${po.name}`);
          this.router$.navigateByUrl('pointsOfInterest');
        },
        error: (err) => { this.toastService.showError('Error', this.errHandlerService.getHttpErrorText(err)); }
      });
    };
  }

  ngOnDestroy() {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }

}
