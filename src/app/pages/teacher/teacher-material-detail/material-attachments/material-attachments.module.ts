import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentListModule } from './attachment-list/attachment-list.module';
import { MaterialAttachmentsComponent } from './material-attachments.component';



@NgModule({
  declarations: [MaterialAttachmentsComponent],
  imports: [
    CommonModule,
    AttachmentListModule,

],
  exports:[MaterialAttachmentsComponent]
})
export class MaterialAttachmentsModule { }
