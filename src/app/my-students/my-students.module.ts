import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyStudentsPageRoutingModule } from './my-students-routing.module';

import { MyStudentsPage } from './my-students.page';
import { SdHeaderTopModule } from '../components/sd-header-top/sd-header-top.module';
import { TrailCardModule } from './trail-card/trail-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyStudentsPageRoutingModule,
    SdHeaderTopModule,
    TrailCardModule
  ],
  declarations: [MyStudentsPage]
})
export class MyStudentsPageModule { }
