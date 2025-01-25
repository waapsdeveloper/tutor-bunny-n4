import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherMaterialDetailPageRoutingModule } from './teacher-material-detail-routing.module';

import { TeacherMaterialDetailPage } from './teacher-material-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherMaterialDetailPageRoutingModule
  ],
  declarations: [TeacherMaterialDetailPage]
})
export class TeacherMaterialDetailPageModule {}
