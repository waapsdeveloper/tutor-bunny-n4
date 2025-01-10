import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-teacher-dashboard-header',
  templateUrl: './teacher-dashboard-header.component.html',
  styleUrls: ['./teacher-dashboard-header.component.scss'],
})
export class TeacherDashboardHeaderComponent {

  user$;

  image = '';
  displayName = '';
  flag;
  shownoti = true;
  status;
  total_rating;
  state
  showNoti = false;
  travel_policy;
  rating;

  constructor(private users: UsersService) {

    this.users.getUserState().subscribe((data) => {
      this.user$ = data;
      this.setUserData(this.user$);
    });
  }

  setUserData(user) {

    console.log(user)
    this.image = user.image;
    this.flag = user.flag;
    this.displayName = user.displayName;
    this.status = user.status;
    this.total_rating = user.total_rating;
    this.rating = user.avg_rating
  }

}
