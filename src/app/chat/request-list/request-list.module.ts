import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestListComponent } from './request-list.component';
import { NamesPipeModule } from 'src/app/pipes/name.pipe.module';



@NgModule({
  declarations: [RequestListComponent],
  imports: [
    CommonModule,
    NamesPipeModule
  ],
  exports:[RequestListComponent]
})
export class RequestListModule { }
