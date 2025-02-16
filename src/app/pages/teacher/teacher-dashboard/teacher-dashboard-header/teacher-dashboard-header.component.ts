import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilityService } from 'src/app/services/utility.service';

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

  @Output() openProfile = new EventEmitter<any>()
  @Output() openNotifications = new EventEmitter<any>()

  constructor(private users: UsersService, private utility: UtilityService, private notifications: NotificationsService) {

    
  }

  ngOnInit(): void {    

    const user = this.users.getUser();
    this.setRawUserData(user);
    this.users.getUserState().subscribe((data) => {

      if(data.id == -1){
        return;
      }
      console.log("user status", data)
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

  setRawUserData(user){
    console.log(user)
    this.image = user.image;
    this.flag = this.utility.getFlag( user );
    this.displayName = this.utility.getAmericanName( user.name );
    this.status = user.teacher.status;
    this.total_rating = user.teacher.total_rating;
    this.rating = user.teacher.avg_rating
  }

}
