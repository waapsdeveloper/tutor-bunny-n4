import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecTechersBoxComponent } from './rec-techers-box.component';



@NgModule({
  declarations: [RecTechersBoxComponent],
  imports: [
    CommonModule
  ],
  exports: [RecTechersBoxComponent]
})
export class RecTechersBoxModule { }
