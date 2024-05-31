import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCategoryComponent } from './course-category.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';



@NgModule({
  declarations: [CourseCategoryComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    SdErrorInputInfoModule
  ],
  exports:[CourseCategoryComponent]
})
export class CourseCategoryModule { }
