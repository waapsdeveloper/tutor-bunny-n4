import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stp-page-profile-statistics',
  templateUrl: './stp-page-profile-statistics.component.html',
  styleUrls: ['./stp-page-profile-statistics.component.scss'],
})
export class StpPageProfileStatisticsComponent {

  years_of_experience = 0;
  course_count = 0;
  notes_count = 0;


  private _data: any; 
  @Input()
  set data(value: any) {
    this._data = value;
    this.updateUserDetails(value);
  }

  get data(): any {
    return this._data;
  }


  constructor() { }

  
  updateUserDetails(value: any){

    console.log(value)
    if (value) {
      this.years_of_experience = this.calculateYear(value.years_of_experience) || 0;
      this.course_count = value.course_count || 0;
      this.notes_count = value.notes_count || 0;
    }

  }

  calculateYear(experience) {
    const currentYear = new Date().getFullYear();
    return currentYear - experience;
  }

}
