import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCategoryComponent } from './course-category.component';



@NgModule({
  declarations: [CourseCategoryComponent],
  imports: [
    CommonModule
  ],
  exports:[CourseCategoryComponent]
})
export class CourseCategoryModule { }
