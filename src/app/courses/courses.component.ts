import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service'; // this component needs the backend service
import { Course } from '../course.model'; // this component needs our course model
import { PageInfoService } from '../page-info.service'; // this component needs our page-info service


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  
  filterQuery: string; // filter argument
  courses: Course[]; // array of courses to be rendered on the courses page
  

  constructor(private backend: BackendService, public pageinfo: PageInfoService, private route: ActivatedRoute) { 
    this.courses = [];
    this.filterQuery = "";
    //The page-info service method coursesPageInfo update page 
    //information with correct values for courses page which is rendered in the app-component
    this.pageinfo.coursesPageInfo();
  }

  //Assign input from course-filter component to the filterQuery parament 
  //to be used as filter argument to filter my courses
  //will be when a character is entered in the search box
  filterText(filterString: string) {
    this.filterQuery = filterString
  }

  ngOnInit(): void {
    this.getCourses();
  }

  //Retrieve all courses using the backend service and sort the array
  getCourses(){
    //the backend service method getCourses returns an Observable<Course[]> 
    //that will emit the array of courses
    this.backend.getCourses().subscribe(courses=>{
      //emit array of courses is assigned to component array courses 
      //which holds the courses to be rendered on the courses-component.html
      this.courses = courses;   
      //sort courses by course code in alphabetical order
      this.courses.sort((a,b) => a.courseCode.localeCompare(b.courseCode));
    })
  }

}
