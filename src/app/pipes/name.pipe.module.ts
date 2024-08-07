import { NgModule } from '@angular/core';
import { NamesPipe } from 'src/app/pipes/names.pipe';



@NgModule({
  declarations: [NamesPipe],
  imports: [
  ],
  exports: [NamesPipe]
})
export class NamesPipeModule { }
