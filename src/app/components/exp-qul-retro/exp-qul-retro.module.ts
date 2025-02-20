import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpQulRetroComponent } from './exp-qul-retro.component';
import { IonicModule } from '@ionic/angular';
import { GlobalTextReadModule } from "../global-text-read/global-text-read.module";



@NgModule({
  declarations: [ExpQulRetroComponent],
  imports: [
    CommonModule,
    IonicModule,
    GlobalTextReadModule
],
  exports: [ExpQulRetroComponent]
})
export class ExpQulRetroModule { }
