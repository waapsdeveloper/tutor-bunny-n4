import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentOtherStudyMaterialComponent } from './student-other-study-material.component';
import { StudyMaterialListModule } from './study-material-list/study-material-list.module';

@NgModule({
  declarations: [StudentOtherStudyMaterialComponent],
  imports: [
    CommonModule,
    StudyMaterialListModule 
    
  ],
  exports: [StudentOtherStudyMaterialComponent],
})
export class StudentOtherStudyMaterialModule { }
