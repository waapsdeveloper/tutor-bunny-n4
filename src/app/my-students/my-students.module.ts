import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyStudentsPageRoutingModule } from './my-students-routing.module';

import { MyStudentsPage } from './my-students.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyStudentsPageRoutingModule
  ],
  declarations: [MyStudentsPage]
})
export class MyStudentsPageModule {}
