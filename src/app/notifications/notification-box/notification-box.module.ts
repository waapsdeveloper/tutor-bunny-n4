import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationBoxComponent } from './notification-box.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [NotificationBoxComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[NotificationBoxComponent]
})
export class NotificationBoxModule { }
