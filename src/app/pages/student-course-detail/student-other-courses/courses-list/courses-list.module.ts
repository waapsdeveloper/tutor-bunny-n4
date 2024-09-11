import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CoursesListComponent],
  imports: [
    CommonModule,
    FormsModule,

  ],
  exports: [CoursesListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class CoursesListModule { }
