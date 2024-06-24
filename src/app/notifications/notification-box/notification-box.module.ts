import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationBoxComponent } from './notification-box.component';



@NgModule({
  declarations: [NotificationBoxComponent],
  imports: [
    CommonModule
  ],
  exports:[NotificationBoxComponent]
})
export class NotificationBoxModule { }
