import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from './message-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MessageListComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [MessageListComponent]
})
export class MessageListModule { }
