import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewsByStudentPageRoutingModule } from './reviews-by-student-routing.module';

import { ReviewsByStudentPage } from './reviews-by-student.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewsByStudentPageRoutingModule,
    SdHeaderTopModule
  ],
  declarations: [ReviewsByStudentPage]
})
export class ReviewsByStudentPageModule {}
