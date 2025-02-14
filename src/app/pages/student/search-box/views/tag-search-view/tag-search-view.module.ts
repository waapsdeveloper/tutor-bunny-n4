import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagSearchViewComponent } from './tag-search-view.component';



@NgModule({
  declarations: [TagSearchViewComponent],
  imports: [
    CommonModule
  ],
  exports: [TagSearchViewComponent]
})
export class TagSearchViewModule { }
