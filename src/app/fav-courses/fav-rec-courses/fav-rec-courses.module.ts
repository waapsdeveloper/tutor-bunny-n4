import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavRecCoursesComponent } from './fav-rec-courses.component';
import { FavRecListModule } from './fav-rec-list/fav-rec-list.module';



@NgModule({
  declarations: [FavRecCoursesComponent],
  imports: [
    CommonModule,
    FavRecListModule
  ],
  exports:[FavRecCoursesComponent]
})
export class FavRecCoursesModule { }
