import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalTextReadComponent } from './global-text-read.component';



@NgModule({
  declarations: [GlobalTextReadComponent],
  imports: [
    CommonModule
  ],
  exports: [GlobalTextReadComponent]
})
export class GlobalTextReadModule { }
