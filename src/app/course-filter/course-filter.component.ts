import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-filter',
  templateUrl: './course-filter.component.html',
  styleUrls: ['./course-filter.component.css']
})
export class CourseFilterComponent implements OnInit {
  @Output() findCoursesEvent: EventEmitter<string> = new EventEmitter();
  //Label for the search box
  searchLabel: string = 'Search: ';
  searchTerm: string;

  constructor() {
    this.searchTerm = ""
   }

  ngOnInit(): void {}
  filterCourses() {
    this.findCoursesEvent.emit(this.searchTerm);
  }

}
