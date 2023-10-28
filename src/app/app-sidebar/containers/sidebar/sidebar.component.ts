import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; 
import { faCity } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUrl: string = '';
  faMapMarkerAlt = faMapMarkerAlt;
  faCity = faCity;

  constructor(private router: Router) { 
    //catch event when leave the current route!
    router.events.subscribe((evt: NavigationEnd) => {
      if(evt instanceof NavigationEnd) {
        this.currentUrl = evt.url; 
        console.log(`Current Url:${this.currentUrl}`);
      }
    });
  }

  ngOnInit() {
  }

}
