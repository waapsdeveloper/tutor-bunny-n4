import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateCoursePageRoutingModule } from './create-course-routing.module';

import { CreateCoursePage } from './create-course.page';
import { SdButtonGrayModule } from 'src/app/components/sd-button-gray/sd-button-gray.module';
import { SdButtonClearModule } from 'src/app/components/sd-button-clear/sd-button-clear.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCoursePageRoutingModule,
    SdButtonGrayModule,
    SdButtonClearModule
  ],
  declarations: [CreateCoursePage]
})
export class CreateCoursePageModule { }
