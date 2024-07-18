import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuFooterBoxComponent } from './menu-footer-box.component';



@NgModule({
  declarations: [MenuFooterBoxComponent],
  imports: [
    CommonModule
  ],
  exports:[MenuFooterBoxComponent]
})
export class MenuFooterBoxModule { }
