import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileVideoComponent } from './profile-video.component';
import { IonicModule } from '@ionic/angular';
import { SdErrorInputInfoModule } from 'src/app/components/sd-error-input-info/sd-error-input-info.module';



@NgModule({
  declarations: [ProfileVideoComponent],
  imports: [
    CommonModule,
    IonicModule,
    SdErrorInputInfoModule
  ],
  exports:[ProfileVideoComponent]
})
export class ProfileVideoModule { }
