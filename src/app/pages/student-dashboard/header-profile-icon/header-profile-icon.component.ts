import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header-profile-icon',
  templateUrl: './header-profile-icon.component.html',
  styleUrls: ['./header-profile-icon.component.scss'],
})
export class HeaderProfileIconComponent  implements OnInit {

  user$;
  showWarning = false;
  isProfileComplete;



  constructor(private users: UsersService) { 

    this.users.getUserState().subscribe( data => {
      this.user$ = data;


    })

  }

  ngOnInit() {

  }

  async initialize() {

    this.user = this.users.getUser();
    






    this.profileImage = this.user.image;

    this.setupEvents();
    //

    if (
      this.user &&
      this.user.student &&
      this.user.student.country &&
      this.user.student.country.name
    ) {
      this.country = this.user.student.country.name;
    }

    this.displayName = this.utility.splitName(this.user.name).first_name;
    this.flag = this.getFlag();


    const isProfileCompleted = (await this.profiles.isProfileCompleted(
      this.user
    )) as any;
    this.showWarning = isProfileCompleted;

    this.events.publish('is-student-profile-completed', this.showWarning);
  }

}
