import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrailListComponent } from './trail-list.component';
import { IonicModule } from '@ionic/angular';
import { NamesPipeModule } from 'src/app/name.pipe.module';



@NgModule({
  declarations: [TrailListComponent],
  imports: [
    CommonModule,
    IonicModule,
    NamesPipeModule
  ],
  exports: [TrailListComponent]
})
export class TrailListModule { }
