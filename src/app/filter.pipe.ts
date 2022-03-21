import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(courses: any[], searchTerm: string){
    let filteredCourses = [];
    if(searchTerm){
      for(let i=0; i<courses.length; i++ ){
        if(courses[i].courseCode.toUpperCase().includes(searchTerm.toUpperCase())){
          filteredCourses.push(courses[i])
        }
      }
      return filteredCourses;
    } else{
      return courses;
    }
    
  }

}
