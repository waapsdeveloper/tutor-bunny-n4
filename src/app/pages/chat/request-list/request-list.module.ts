import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestListComponent } from './request-list.component';
import { NamesPipeModule } from 'src/app/pipes/name.pipe.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [RequestListComponent],
  imports: [CommonModule, NamesPipeModule, IonicModule],
  exports: [RequestListComponent],
})
export class RequestListModule {}
