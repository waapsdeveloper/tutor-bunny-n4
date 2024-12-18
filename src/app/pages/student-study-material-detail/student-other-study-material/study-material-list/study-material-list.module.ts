import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudyMaterialListComponent } from './study-material-list.component';


@NgModule({
  declarations: [StudyMaterialListComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports:[StudyMaterialListComponent],
    //schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class StudyMaterialListModule { }
