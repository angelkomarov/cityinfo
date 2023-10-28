import { Component, OnInit } from '@angular/core';
import { AppToastService } from '../../services/app-toast.service';

@Component({
  selector: 'app-info-toast',
  templateUrl: './info-toast.component.html',
  styleUrls: ['./info-toast.component.scss'],
})
export class InfoToastComponent implements OnInit {

  constructor(public toastService: AppToastService) { } //Import my custom toast service

  ngOnInit() {
  }

}
