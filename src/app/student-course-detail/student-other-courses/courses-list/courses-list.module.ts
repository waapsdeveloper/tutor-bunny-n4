import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list.component';



@NgModule({
  declarations: [CoursesListComponent],
  imports: [
    CommonModule
  ],
  exports: [CoursesListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class CoursesListModule { }
