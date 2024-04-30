import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCountryComponent } from './list-country.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ListCountryComponent],
  imports: [CommonModule, IonicModule],
  exports: [ListCountryComponent],
})
export class ListCountryModule {}
