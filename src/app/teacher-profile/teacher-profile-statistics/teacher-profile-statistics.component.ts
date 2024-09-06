import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-profile-statistics',
  templateUrl: './teacher-profile-statistics.component.html',
  styleUrls: ['./teacher-profile-statistics.component.scss'],
})
export class TeacherProfileStatisticsComponent implements OnInit {
  private _experince: any;

  @Input('experince')
  public get experince() {
    return this._experince;
  }

  public set experince(value: any) {
    this._experince = value;
    this.calculateAge()
  }
  year

  constructor() {
  }
  calculateAge() {
    const currentYear = new Date().getFullYear();
    this.year = currentYear - this.experince;

  }

  ngOnInit() {}
}
