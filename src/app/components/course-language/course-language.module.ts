import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseLanguageComponent } from './course-language.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListCountryModule } from '../sd-country-box/list-country/list-country.module';
import { SdErrorInputInfoModule } from '../sd-error-input-info/sd-error-input-info.module';
import { CourseLanguageListModule } from './course-language-list/course-language-list.module';



@NgModule({
  declarations: [CourseLanguageComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    SdErrorInputInfoModule,
    CourseLanguageListModule
  ],
  exports: [CourseLanguageComponent]
})
export class CourseLanguageModule { }
