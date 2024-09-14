import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box.component';
import { IonicModule } from '@ionic/angular';
import { ProfileSearchBoxModule } from '../profile-search-box/profile-search-box.module';



@NgModule({
  declarations: [SearchBoxComponent],
  imports: [
    CommonModule,
    IonicModule,
    ProfileSearchBoxModule
  ],
  exports:[SearchBoxComponent]
})
export class SearchBoxModule { }
