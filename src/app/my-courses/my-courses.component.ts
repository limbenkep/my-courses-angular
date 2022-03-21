import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service'; // this component needs our backend service
import { MyCourse } from '../my-course.model'; // this component needs our User class (model)
import { PageInfoService } from '../page-info.service'; // this component needs our page-info service



@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  myCourses: MyCourse[];
  filterQuery: string;
 

  constructor(private backend: BackendService, public pageinfo: PageInfoService, private route: ActivatedRoute) { 
    this.myCourses = [];
    this.filterQuery ="";

    //The page-info service method myCoursesPageInfo update page 
    //information with correct values for my course page which is rendered in the app-component
    this.pageinfo.myCoursesPageInfo();

  }

  ngOnInit(): void {
    this.getMyCourses();
  }
  //Retrieve all my courses using the backend service and sort the array 
  getMyCourses(){
    //the backend service method getCourses returns an Observable<MyCourse[]> 
    //that will emit the array of courses
    this.backend.getMyCourses().subscribe(courses=>{
      //emit array of courses is assigned to component array myCourses 
      //which holds the courses to be rendered on the my-courses-component.html
      this.myCourses = courses;
      //sort my courses by course code in alphabetical order
      this.myCourses.sort((a,b) => a.courseCode.localeCompare(b.courseCode));
    })
  }

  //Assign input from course-filter component to the filterQuery parament 
  //to be used as filter argument to filter my courses
  //will be when a character is entered in the search box
  filterText(filterString: string) {
    this.filterQuery = filterString
  }

  //Add a course to the courses array
  //will be called when the add-my-course component adds a new course
  addMyCourse(myCourse: MyCourse){
    this.myCourses.push(myCourse);
  }
  //Changes the status of an existing course
  //will be called when the checkbox for a course on the my-courses page is clicked
  updateMyCourse(courseCode: string, status: string){
    //the backend service method updateCourse returns an Observable<MyCourse> 
    //that will emit a "my course"
    this.backend.updateMyCourse(courseCode, status).subscribe(myCourse=>{
        //Update course in the myCourses array
        //first get current index of course in the array...
        const index = this.myCourses.findIndex(course => course.courseCode == myCourse.courseCode);

        if(index != -1){
          //...then update the course at that index
          this.myCourses[index].status = myCourse.status;
        }
    })
  }

  //Remove a "my course" with a given course code using the backend service
  // Will be called when a click event occurs on the 'delete' button.
  deleteCourse(courseCode:string){
    //the backend service method deleteMyCourse returns an Observable<number> that will emit
    // http status code. The subscribe() method passes the emitted status code 
    // to the callback, in which we check if it is 200 and then delete the myCourse from myCourses array.
    this.backend.deleteMyCourse(courseCode).subscribe(statusCode=>{
      if(statusCode===200) {
        //remove deleted course from the myCourses array
        //first get current index of course in the array...
        const index = this.myCourses.findIndex(myCourse => myCourse.courseCode == courseCode);

        if(index != -1){
          //...then delete the course at that index
          this.myCourses.splice(index, 1);
        }
      }
      //ignore all other status
    })
  }

  //return text corresponding to the different status values; 
  //"Avklarad" for 1 and "Pågående" for 0
  getTextStatus = function(course: MyCourse){
            
    if(course.status == 1){
        return "Avklarad";
    }
    return "Pågående";
  }

  check = function(course: MyCourse){
            
    if(course.status == 1){
        return true;
    }
    return false;
  }
  


  //switch status between 0 and 1 each time the checkbox is checked or unchecked by the user
  switchStatus(course: MyCourse){
      var status = null;
      if(course.status==0){
          status = 1;
      }
      else{
          status = 0;
      }
      let statusString = status.toString()
      let coursecode = course.courseCode
      this.backend.updateMyCourse(coursecode, statusString).subscribe(myCourse=>{
        //Update course in the myCourses array
        //first get current index of course in the array...
        const index = this.myCourses.findIndex(course => course.courseCode == myCourse.courseCode);

        if(index != -1){
          //...then update the course at that index
          this.myCourses[index].status = myCourse.status;
        }
    })
  }

}
