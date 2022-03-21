import { HttpErrorResponse } from "@angular/common/http";
import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from "rxjs";
import { BackendService } from "../backend.service";
import { MyCourse } from "../my-course.model";

// this type is used for displaying error/success messages when adding a user
// the type of message is either success or error
type Message = { message: string, type: 'success' | 'error' };

@Component({
  selector: 'app-add-my-course',
  templateUrl: './add-my-course.component.html',
  styleUrls: ['./add-my-course.component.css']
})
export class AddMyCourseComponent implements OnInit {
  courseCode:string;
  status: string;
  message: Message|undefined;

  @Output() newCourseEvent: EventEmitter<MyCourse>;
  

  constructor(private backend: BackendService) {
    this.courseCode="";
    this.status = "";
    this.message = undefined;
    this.newCourseEvent= new EventEmitter<MyCourse>();
    
   }

  ngOnInit(): void {}

  addMyCourse(){
    let addMyCourseObservable : Observable<MyCourse>;
    addMyCourseObservable = this.backend.addMyCourse(this.courseCode, this.status)
    addMyCourseObservable.subscribe({
      next: myCourse =>this.handleCourseAdded(myCourse),
      error: error => this.handleError(error)
    });
  }

  private handleCourseAdded(myCourse:MyCourse){
    this.courseCode = "",
    this.status = ""
    this.setMessage(
      {
        message: 'Course with course code'+ this.courseCode + 'has been added to my courses',
        type: 'success'
      }
    );

    //notify the parent component (my-courses component) that a new user is added
    this.newCourseEvent.emit(myCourse);
  }

  // Handle any errors thrown when adding a user
  private handleError(error: HttpErrorResponse) {
    console.log(`error adding course: ${error.status} ${error.statusText}`);

    // The error property of the HttpErrorResponse contains the underlying error object.
    // The server-side errors return status codes, we can take appropriate actions based 
    // on that. The status code is set to the error.status property.

    // Figure out the type of error and handle it accordingly
    // Tha api can either return status codes 400 or 409 when adding (POST) a user.
    // We handle both cases the same way.
    switch (error.status) {
      case 400:
      case 409:
        // Set message to the error message from api
        this.setMessage(
          {
            message: error.error.error, // last 'error' is the error message returned from the api
            type: 'error'
          }
        );
        break;
      default:
    } 
  }

  setMessage(message: Message, hide: boolean = true){
    this.message = message;

    if(hide){
      // To hide the message after 5 seconds, we use setTimeout
      setTimeout (() => {
        this.message = undefined;
      }, 5000);
    }
  }
}
