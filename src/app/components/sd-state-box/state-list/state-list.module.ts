import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateListComponent } from './state-list.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [StateListComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports:[StateListComponent]
})
export class StateListModule { }
