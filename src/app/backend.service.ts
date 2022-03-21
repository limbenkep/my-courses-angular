import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Course } from './course.model';
import { MyCourse } from './my-course.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BackendService {
  // url to the RESTful API this application uses
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

//Get all courses in collection
  getCourses(): Observable<Course[]>{
    const url = this.baseUrl + 'courses';
    return this.http.get<any>(url);
  }

  //Get all my courses
  getMyCourses(): Observable<any>{
    const url = this.baseUrl + 'my/courses';
    return this.http.get<any>(url);
  }

  //Get a course from courses collection
  getCourse(courseCode: string): Observable<any>{
    const url = this.baseUrl + 'courses/' + courseCode ;
    return this.http.get<any>(url);
  }

  //Get a course from my courses collection
  getMyCourse(courseCode: string): Observable<any>{
    const url = this.baseUrl + 'my/courses/' + courseCode ;
    return this.http.get<any>(url);
  }

  //Add a course to my courses collection
  addMyCourse(courseCode: string, status:string): Observable<any>{
    const url = this.baseUrl + 'my/courses';
    const body = {
      courseCode: courseCode,
      status: status,
    }
    return this.http.post<any>(url, body);
  }

  //Get a course from my courses collection
  updateMyCourse(courseCode: string, status: string): Observable<any>{
    const url = this.baseUrl + 'my/courses/' + courseCode ;
    const body = {status: status}
    return this.http.put<any>(url, body);
  }

  //Delete the course with the given course codefrom my courses collection
  deleteMyCourse(courseCode: string): Observable<any>{
    const url = this.baseUrl + 'my/courses/' + courseCode ;
    return this.http.delete<any>(url);
  }
 
}
