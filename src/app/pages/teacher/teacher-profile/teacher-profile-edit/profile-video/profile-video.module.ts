import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileVideoComponent } from './profile-video.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ProfileVideoComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[ProfileVideoComponent]
})
export class ProfileVideoModule { }
