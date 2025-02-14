import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptySearchViewComponent } from './empty-search-view.component';



@NgModule({
  declarations: [EmptySearchViewComponent],
  imports: [
    CommonModule
  ],
  exports: [EmptySearchViewComponent]
})
export class EmptySearchViewModule { }
