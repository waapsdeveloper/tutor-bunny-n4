import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSearchViewComponent } from './filter-search-view.component';



@NgModule({
  declarations: [FilterSearchViewComponent],
  imports: [
    CommonModule
  ],
  exports: [FilterSearchViewComponent]
})
export class FilterSearchViewModule { }
