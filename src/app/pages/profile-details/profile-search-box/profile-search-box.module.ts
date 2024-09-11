import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSearchBoxComponent } from './profile-search-box.component';



@NgModule({
  declarations: [ProfileSearchBoxComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ProfileSearchBoxComponent
  ]
})
export class ProfileSearchBoxModule { }
