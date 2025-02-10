import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypingBoxComponent } from './typing-box.component';



@NgModule({
  declarations: [TypingBoxComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TypingBoxComponent
  ]
})
export class TypingBoxModule { }
