import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListBoxComponent } from './menu-list-box.component';



@NgModule({
  declarations: [MenuListBoxComponent],
  imports: [
    CommonModule
  ],
  exports:[MenuListBoxComponent]
})
export class MenuListBoxModule { }
