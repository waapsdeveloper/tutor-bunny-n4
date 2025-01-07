import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialAttachmentsComponent } from './material-attachments.component';
import { CourseListModule } from 'src/app/components/my-courses/course-list/course-list.module';
import { AttachmentListModule } from './attachment-list/attachment-list.module';


@NgModule({
  declarations: [MaterialAttachmentsComponent],
  imports: [
    CommonModule,
    AttachmentListModule
  ],
  exports: [MaterialAttachmentsComponent]
})
export class MaterialAttachmentsModule { }
