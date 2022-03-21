import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';

const routes: Routes = [
  {path: 'courses', component: CoursesComponent},
  {path: 'my-courses', component: MyCoursesComponent},
  {path: '', redirectTo:'/courses', pathMatch: 'full' },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
