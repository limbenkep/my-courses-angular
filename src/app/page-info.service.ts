import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageInfoService {
  heading: string;
  text: string;
  dataSourceLink: string;
  dataSourceName: string;


  constructor() { 
    this.heading = 'Mittuniversitetets kursutbud';
    this.text = 'Följande kurser finns att läsa hos oss:';
    this.dataSourceLink =environment.baseUrl + 'courses';
    this.dataSourceName = "Mittuniversitetets kursutbud";
  }

  //load page info for courses page. 
  //called when routerLink to 'Alla kurser' is clicked
  coursesPageInfo(){
    this.heading = 'Mittuniversitetets kursutbud';
    this.text = 'Följande kurser finns att läsa hos oss:';
    this.dataSourceLink =environment.baseUrl + 'courses';
    this.dataSourceName = "Mittuniversitetets kursutbud";
  }
  //Load page info for courses page. 
  //called when routerLink to 'Mina kurser' is clicked
  myCoursesPageInfo(){
    this.heading = "Mina kurser";
    this.text="Detta är mina kurser:";
    this.dataSourceLink =environment.baseUrl + 'my/courses';;
    this.dataSourceName = "Mina kurser";
  }
}
