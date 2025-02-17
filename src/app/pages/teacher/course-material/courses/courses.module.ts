import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursesPageRoutingModule } from './courses-routing.module';

import { CoursesPage } from './courses.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { CourseCardModule } from './course-card/course-card.module';
import { SdBbackBtnModule } from 'src/app/components/sd-bback-btn/sd-bback-btn.module';
import { GlobalListViewModule } from 'src/app/components/global-list-view/global-list-view.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursesPageRoutingModule,
    SdHeaderTopModule,
    GlobalListViewModule,
    CourseCardModule,
    SdBbackBtnModule
  ],
  declarations: [CoursesPage],
  exports: [CoursesPage]
})
export class CoursesPageModule {}
