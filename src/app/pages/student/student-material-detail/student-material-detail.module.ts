import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentMaterialDetailPageRoutingModule } from './student-material-detail-routing.module';

import { StudentMaterialDetailPage } from './student-material-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentMaterialDetailPageRoutingModule
  ],
  declarations: [StudentMaterialDetailPage]
})
export class StudentMaterialDetailPageModule {}
