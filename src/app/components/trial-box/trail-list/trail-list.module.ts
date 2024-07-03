import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrailListComponent } from './trail-list.component';
import { IonicModule } from '@ionic/angular';
import { NamesPipe } from 'src/app/names.pipe';



@NgModule({
  declarations: [TrailListComponent, NamesPipe],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [TrailListComponent]
})
export class TrailListModule { }
