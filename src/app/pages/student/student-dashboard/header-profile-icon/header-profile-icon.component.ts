import { Component, Output, EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header-profile-icon',
  templateUrl: './header-profile-icon.component.html',
  styleUrls: ['./header-profile-icon.component.scss'],
})
export class HeaderProfileIconComponent {

  user$;
  showWarning = false;
  isProfileComplete;

  @Output() updateProfile = new EventEmitter<any>();

  constructor(private users: UsersService, private profiles: ProfileService ) { 

    this.users.getUser().subscribe( data => {
      this.user$ = data;
      this.initialize(data);
    });

  }

  async initialize(user) {
    const isProfileCompleted = (await this.profiles.isProfileCompleted(user)) as any;
    this.showWarning = isProfileCompleted;
  }


}
