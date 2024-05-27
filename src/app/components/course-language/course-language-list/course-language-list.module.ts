import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SdButtonGrayModule } from '../../sd-button-gray/sd-button-gray.module';
import { SdHeaderTopModule } from '../../sd-header-top/sd-header-top.module';
import { CourseLanguageListComponent } from './course-language-list.component';



@NgModule({
  declarations: [CourseLanguageListComponent],
  imports: [
    CommonModule, IonicModule, FormsModule, SdHeaderTopModule, SdButtonGrayModule
  ],
  exports: [CourseLanguageListComponent]
})
export class CourseLanguageListModule { }
