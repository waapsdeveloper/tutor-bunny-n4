import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherCreditsPageRoutingModule } from './teacher-credits-routing.module';

import { TeacherCreditsPage } from './teacher-credits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherCreditsPageRoutingModule
  ],
  declarations: [TeacherCreditsPage]
})
export class TeacherCreditsPageModule {}
