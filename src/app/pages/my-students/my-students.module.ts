import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyStudentsPageRoutingModule } from './my-students-routing.module';

import { MyStudentsPage } from './my-students.page';
import { SdHeaderTopModule } from 'src/app/components/sd-header-top/sd-header-top.module';
import { TrailCardModule } from './trail-card/trail-card.module';
import { FilterStatusPipe } from './filter-status.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyStudentsPageRoutingModule,
    SdHeaderTopModule,
    TrailCardModule,
    
  ],
  declarations: [MyStudentsPage, FilterStatusPipe ]
})
export class MyStudentsPageModule { }
