import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentWelcomeComponent } from './student-welcome.component';
import { SdButtonClearModule } from 'src/app/components/sd-button-clear/sd-button-clear.module';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [StudentWelcomeComponent],
  imports: [
    CommonModule,
    IonicModule,
    SdButtonClearModule,
    SdButtonGrayModule,
    FormsModule
  ],
  exports:[StudentWelcomeComponent]
})
export class StudentWelcomeModule { }
