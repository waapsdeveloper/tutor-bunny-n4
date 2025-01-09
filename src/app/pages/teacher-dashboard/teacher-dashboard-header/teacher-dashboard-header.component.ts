import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-teacher-dashboard-header',
  templateUrl: './teacher-dashboard-header.component.html',
  styleUrls: ['./teacher-dashboard-header.component.scss'],
})
export class TeacherDashboardHeaderComponent implements OnInit {

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

  ngOnInit() { }

  setUserData(user) {

    console.log(user)
    // let obj = {
    //   email: this.user.email,
    // };
    // let res = await this.network.getUserByEmail(obj);
    this.image = user.image;
    this.flag = this.getFlag(user);
    this.displayName = user.displayName;
    this.status = user.status;
    this.total_rating = user.total_rating;
    this.rating = user.teacher.avg_rating
  }



  getFlag(user) {
    if (user && user.teacher && user.teacher.country) {
      const flag = user.teacher.country.iso2;
      if (flag) {
        return flag.toLowerCase();
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

}
