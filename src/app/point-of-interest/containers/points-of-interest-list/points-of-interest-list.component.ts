import { Component, OnDestroy, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'; //import 3 modal routines 
import { Subject, filter } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { PointOfInterest } from '../../models/point-of-interest.model';
import { AppToastService } from 'src/app/app-toasts/services/app-toast.service';
import { City } from 'src/app/city/models/city.model';
import { CityApiService } from 'src/app/city/services/city-api.service';
import { ErrrorHandlerService } from 'src/app/shared/services/errror-handler.service';
import { PointOfInterestApiService } from '../../services/point-of-interest-api.service';


@Component({
  selector: 'app-points-of-interest-list',
  templateUrl: './points-of-interest-list.component.html',
  styleUrls: ['./points-of-interest-list.component.scss']
})
export class PointsOfInterestListComponent implements OnInit, OnDestroy {
  citiesDetails: City[] = [];
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  delCityid: number;
  delPo: PointOfInterest = {};
  //declare modal service ref
  modalRef: NgbModalRef;
  closeResult: string;
  destroyed$ = new Subject();  
  //--AK1.3 - if shows summary comp at start up or not
  showSummary: boolean = false;

  constructor(private router: Router, 
    private cityApiSvc: CityApiService,
    private poApiSvc: PointOfInterestApiService, 
    private modalService: NgbModal, 
    private toastService: AppToastService,
    private errHandlerService: ErrrorHandlerService) { } //inject toast service

  ngOnInit() {
    this.subscribeToCityDetails();
    this.subscribeToCityError();
    this.cityApiSvc.getCitiesDetails();
  }
  //event binding for edit point of interest
  onClick(cityid, id){
    //routing to edit point of interest
    this.router.navigateByUrl('pointOfInterest/' + cityid + '/' + id); 
  }      

  onShowModal(deleteModal, cityid, po){ 
    this.delCityid = cityid;
    this.delPo = po;
    //call modalService to open modal
    this.modalRef = this.modalService.open(deleteModal, {ariaLabelledBy: 'modal-basic-title', backdrop: 'static', centered: true});
    this.modalRef.result.then((result) => { //modalRef.close
      this.closeResult = `Modal Closed with: ${result}`;  
      console.log(this.closeResult);
      //call the service
      this.poApiSvc.deletePointOfInterest(this.delCityid, this.delPo.id).pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (result) => {
          this.toastService.showSuccess( 'Success', 'Point Of Interest has been deleted'); 
          this.cityApiSvc.getCitiesDetails();
        },
        error: (err) => { this.toastService.showError('Error', this.errHandlerService.getHttpErrorText(err)); }
      });
    }, (dismissed) => { //modalRef.dismiss (cancel, Esc, click on background)
      this.closeResult = `Modal Dismissed ${this.getDismissReason(dismissed)}`;
      console.log(this.closeResult);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  subscribeToCityDetails() {
    //!!AK1 Subscribe to subject's observable
    this.cityApiSvc.cities$.pipe(takeUntil(this.destroyed$)).pipe(
      filter(citiesDetails => typeof citiesDetails != 'undefined' &&  citiesDetails !=  null)
    )
    .subscribe ({
      next: (citiesDetails) => {
        console.log('cities$ subject details: ' + citiesDetails.map(cityDetails => cityDetails.name));
        this.citiesDetails = citiesDetails;
      }
    });
  }

  subscribeToCityError() {
    //!!AK1 Subscribe to error subject observable
    this.cityApiSvc.errors$.pipe(takeUntil(this.destroyed$))
    .subscribe ({
      next: (err) => {
        console.error('errorSubject$ subject error: ' + err);
        this.toastService.showError('Error', this.errHandlerService.getHttpErrorText(err))
      }
    });
  }

  summary() {
    this.showSummary = true;
  }

  ngOnDestroy() {
    //!!AK1 if don't reset then gets data from subject again when comeback to this component second time
    this.cityApiSvc.resetCityDetails(); 
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }

}

