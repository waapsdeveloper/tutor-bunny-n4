import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryListComponent } from './gallery-list.component';



@NgModule({
  declarations: [GalleryListComponent],
  imports: [
    CommonModule
  ],
  exports:[GalleryListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GalleryListModule { }
