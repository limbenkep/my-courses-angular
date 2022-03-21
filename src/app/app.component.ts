import { Component } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { PageInfoService } from './page-info.service'; // this component needs our page-info service

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  heading: string;
  text: string;
  dataSourceLink: string;
  dataSourceName: string;

  constructor(private router: Router, public pageinfo: PageInfoService){
    this.heading = this.pageinfo.heading;
    this.text = this.pageinfo.text;
    this.dataSourceLink = this.pageinfo.dataSourceLink;
    this.dataSourceName = this.pageinfo.dataSourceName;

    //listen for changes in routes...
    router.events.subscribe((event) => {
      //reinitialize page when event occurs. This will enable the correct page 
      //info to be loaded when we move between pages
      this.ngOnInit();
    })
  }
  
  ngOnInit(): void {
    //update page info from pageinfo when initializing
    this.heading = this.pageinfo.heading;
    this.text = this.pageinfo.text;
    this.dataSourceLink = this.pageinfo.dataSourceLink;
    this.dataSourceName = this.pageinfo.dataSourceName;
  }

}

