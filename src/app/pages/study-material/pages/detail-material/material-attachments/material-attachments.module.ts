import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialAttachmentsComponent } from './material-attachments.component';
import { CourseListModule } from 'src/app/components/my-courses/course-list/course-list.module';


@NgModule({
  declarations: [MaterialAttachmentsComponent],
  imports: [
    CommonModule,
    CourseListModule
  ],
  exports: [MaterialAttachmentsComponent]
})
export class MaterialAttachmentsModule { }
